// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IRespectOracle} from "./interfaces/IRespectOracle.sol";

contract TreasuryAccessController {
    enum Tier {
        VIEW,
        PROPOSE,
        EXECUTE_LIMITED,
        EXECUTE_FULL
    }

    address public immutable admin;
    IRespectOracle public respectOracle;
    uint256 public limitedExecutionAmount = 25_000 ether;
    uint256 public fullExecutionRespectThreshold = 300;
    uint256 public proposeRespectThreshold = 120;
    uint256 public limitedExecutionRespectThreshold = 220;

    mapping(address => Tier) private operatorTier;

    event TierRefreshed(address indexed operator, Tier indexed tier, uint256 averageRespect, bool isTopMember);
    event LimitsUpdated(uint256 limitedExecutionAmount, uint256 fullExecutionRespectThreshold);

    modifier onlyAdmin() {
        require(msg.sender == admin, "treasury-access: only admin");
        _;
    }

    constructor(address admin_, address respectOracle_) {
        require(admin_ != address(0), "treasury-access: zero admin");
        require(respectOracle_ != address(0), "treasury-access: zero oracle");
        admin = admin_;
        respectOracle = IRespectOracle(respectOracle_);
    }

    function refreshTier(address operator) external returns (uint8) {
        uint256 averageRespect = respectOracle.getAverageRespect(operator);
        bool topMember = respectOracle.isTopMember(operator);

        Tier nextTier = Tier.VIEW;
        if (averageRespect >= proposeRespectThreshold) {
            nextTier = Tier.PROPOSE;
        }
        if (averageRespect >= limitedExecutionRespectThreshold) {
            nextTier = Tier.EXECUTE_LIMITED;
        }
        if (topMember || averageRespect >= fullExecutionRespectThreshold) {
            nextTier = Tier.EXECUTE_FULL;
        }

        operatorTier[operator] = nextTier;
        emit TierRefreshed(operator, nextTier, averageRespect, topMember);
        return uint8(nextTier);
    }

    function getTier(address operator) external view returns (uint8) {
        return uint8(operatorTier[operator]);
    }

    function canExecute(address operator, bytes4, uint256 amount) external view returns (bool) {
        Tier tier = operatorTier[operator];
        if (tier == Tier.EXECUTE_FULL) {
            return true;
        }
        if (tier == Tier.EXECUTE_LIMITED) {
            return amount <= limitedExecutionAmount;
        }
        return false;
    }

    function setLimits(uint256 limitedExecutionAmount_, uint256 fullExecutionRespectThreshold_) external onlyAdmin {
        limitedExecutionAmount = limitedExecutionAmount_;
        fullExecutionRespectThreshold = fullExecutionRespectThreshold_;
        emit LimitsUpdated(limitedExecutionAmount_, fullExecutionRespectThreshold_);
    }
}
