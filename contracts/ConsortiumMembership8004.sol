// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IIdentityRegistry} from "./interfaces/IIdentityRegistry.sol";

contract ConsortiumMembership8004 {
    struct Membership {
        address operatorWallet;
        bool accepted;
        uint64 membershipEpoch;
    }

    address public immutable admin;
    uint64 public currentEpoch = 1;

    mapping(bytes32 => Membership) private memberships;

    event AgentAccepted(
        address indexed identityRegistry,
        uint256 indexed agentId,
        address indexed operatorWallet,
        uint64 membershipEpoch
    );
    event AgentRemoved(address indexed identityRegistry, uint256 indexed agentId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "membership: only admin");
        _;
    }

    constructor(address admin_) {
        require(admin_ != address(0), "membership: zero admin");
        admin = admin_;
    }

    function acceptAgent(
        address identityRegistry,
        uint256 agentId,
        address operatorWallet
    ) external onlyAdmin {
        require(identityRegistry != address(0), "membership: zero registry");
        require(operatorWallet != address(0), "membership: zero operator");

        bytes32 key = _membershipKey(identityRegistry, agentId);
        require(!memberships[key].accepted, "membership: already active");
        require(_isOperatorAuthorized(identityRegistry, agentId, operatorWallet), "membership: invalid ownership");

        memberships[key] = Membership({
            operatorWallet: operatorWallet,
            accepted: true,
            membershipEpoch: currentEpoch
        });

        emit AgentAccepted(identityRegistry, agentId, operatorWallet, currentEpoch);
        unchecked {
            currentEpoch += 1;
        }
    }

    function removeAgent(address identityRegistry, uint256 agentId) external onlyAdmin {
        bytes32 key = _membershipKey(identityRegistry, agentId);
        require(memberships[key].accepted, "membership: not active");
        delete memberships[key];
        emit AgentRemoved(identityRegistry, agentId);
    }

    function isAcceptedAgent(address identityRegistry, uint256 agentId) external view returns (bool) {
        return memberships[_membershipKey(identityRegistry, agentId)].accepted;
    }

    function getOperatorForAgent(address identityRegistry, uint256 agentId) external view returns (address) {
        return memberships[_membershipKey(identityRegistry, agentId)].operatorWallet;
    }

    function getMembership(address identityRegistry, uint256 agentId) external view returns (Membership memory) {
        return memberships[_membershipKey(identityRegistry, agentId)];
    }

    function _isOperatorAuthorized(
        address identityRegistry,
        uint256 agentId,
        address operatorWallet
    ) internal view returns (bool) {
        IIdentityRegistry registry = IIdentityRegistry(identityRegistry);
        address owner = registry.ownerOf(agentId);
        return owner == operatorWallet || registry.getApproved(agentId) == operatorWallet || registry.isApprovedForAll(owner, operatorWallet);
    }

    function _membershipKey(address identityRegistry, uint256 agentId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(identityRegistry, agentId));
    }
}
