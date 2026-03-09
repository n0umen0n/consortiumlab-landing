// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Minimal {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract ConsortiumTokenVesting {
    struct Grant {
        uint256 totalAmount;
        uint256 claimedAmount;
        uint64 startTime;
        uint64 cliffDuration;
        uint64 vestingDuration;
        bool revoked;
    }

    address public immutable admin;
    address public distributor;
    IERC20Minimal public immutable token;
    uint64 public claimCooldown = 1 days;

    mapping(address => Grant[]) private grantsByOperator;
    mapping(address => uint256) public lastClaimAt;

    event DistributorUpdated(address indexed distributor);
    event GrantCreated(address indexed operator, uint256 indexed grantId, uint256 totalAmount);
    event GrantRevoked(address indexed operator, uint256 indexed grantId, uint256 returnedAmount);
    event TokensClaimed(address indexed operator, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "vesting: only admin");
        _;
    }

    modifier onlyDistributor() {
        require(msg.sender == distributor, "vesting: only distributor");
        _;
    }

    constructor(address admin_, address token_) {
        require(admin_ != address(0), "vesting: zero admin");
        require(token_ != address(0), "vesting: zero token");
        admin = admin_;
        token = IERC20Minimal(token_);
    }

    function setDistributor(address distributor_) external onlyAdmin {
        require(distributor_ != address(0), "vesting: zero distributor");
        distributor = distributor_;
        emit DistributorUpdated(distributor_);
    }

    function createGrant(
        address operator,
        uint256 amount,
        uint64 cliffDuration,
        uint64 vestingDuration
    ) external onlyDistributor returns (uint256 grantId) {
        require(operator != address(0), "vesting: zero operator");
        require(amount > 0, "vesting: zero amount");
        require(vestingDuration >= cliffDuration, "vesting: invalid duration");

        grantsByOperator[operator].push(
            Grant({
                totalAmount: amount,
                claimedAmount: 0,
                startTime: uint64(block.timestamp),
                cliffDuration: cliffDuration,
                vestingDuration: vestingDuration,
                revoked: false
            })
        );

        grantId = grantsByOperator[operator].length - 1;
        emit GrantCreated(operator, grantId, amount);
    }

    function claim() external returns (uint256 claimedAmount) {
        require(block.timestamp >= lastClaimAt[msg.sender] + claimCooldown, "vesting: cooldown");
        Grant[] storage grants = grantsByOperator[msg.sender];
        uint256 claimableAmount;

        for (uint256 i = 0; i < grants.length; i++) {
            uint256 unlocked = _vestedAmount(grants[i], uint64(block.timestamp));
            if (unlocked > grants[i].claimedAmount) {
                uint256 delta = unlocked - grants[i].claimedAmount;
                grants[i].claimedAmount = unlocked;
                claimableAmount += delta;
            }
        }

        require(claimableAmount > 0, "vesting: nothing claimable");
        lastClaimAt[msg.sender] = block.timestamp;
        require(token.transfer(msg.sender, claimableAmount), "vesting: transfer failed");
        emit TokensClaimed(msg.sender, claimableAmount);
        return claimableAmount;
    }

    function revokeUnvested(address operator, uint256 grantId) external onlyAdmin returns (uint256 returnedAmount) {
        Grant storage grant = grantsByOperator[operator][grantId];
        require(!grant.revoked, "vesting: revoked");

        uint256 unlocked = _vestedAmount(grant, uint64(block.timestamp));
        uint256 unvested = grant.totalAmount - unlocked;
        grant.revoked = true;
        grant.totalAmount = unlocked;

        emit GrantRevoked(operator, grantId, unvested);
        return unvested;
    }

    function getGrantCount(address operator) external view returns (uint256) {
        return grantsByOperator[operator].length;
    }

    function getGrant(address operator, uint256 grantId) external view returns (Grant memory) {
        return grantsByOperator[operator][grantId];
    }

    function claimable(address operator) external view returns (uint256 totalClaimable) {
        Grant[] storage grants = grantsByOperator[operator];
        for (uint256 i = 0; i < grants.length; i++) {
            uint256 unlocked = _vestedAmount(grants[i], uint64(block.timestamp));
            if (unlocked > grants[i].claimedAmount) {
                totalClaimable += unlocked - grants[i].claimedAmount;
            }
        }
    }

    function _vestedAmount(Grant memory grant, uint64 timestamp) internal pure returns (uint256) {
        if (grant.revoked) {
            return grant.claimedAmount;
        }
        if (timestamp <= grant.startTime + grant.cliffDuration) {
            return 0;
        }
        if (timestamp >= grant.startTime + grant.vestingDuration) {
            return grant.totalAmount;
        }

        uint256 elapsed = timestamp - grant.startTime;
        return (grant.totalAmount * elapsed) / grant.vestingDuration;
    }
}
