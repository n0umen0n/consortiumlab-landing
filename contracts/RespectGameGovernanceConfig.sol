// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RespectGameGovernanceConfig {
    struct ProposalRule {
        uint256 voteThreshold;
        uint256 minimumVotingPeriod;
        bool exists;
    }

    address public immutable admin;
    bytes32 public constant TREASURY_ACCESS_POLICY = keccak256("TREASURY_ACCESS_POLICY");

    mapping(bytes32 => ProposalRule) private rules;

    event ProposalRuleUpdated(bytes32 indexed proposalType, uint256 voteThreshold, uint256 minimumVotingPeriod);

    modifier onlyAdmin() {
        require(msg.sender == admin, "governance-config: only admin");
        _;
    }

    constructor(address admin_) {
        require(admin_ != address(0), "governance-config: zero admin");
        admin = admin_;
    }

    function setProposalRule(
        bytes32 proposalType,
        uint256 voteThreshold,
        uint256 minimumVotingPeriod
    ) external onlyAdmin {
        require(voteThreshold > 0, "governance-config: zero threshold");
        require(minimumVotingPeriod > 0, "governance-config: zero duration");

        rules[proposalType] = ProposalRule({
            voteThreshold: voteThreshold,
            minimumVotingPeriod: minimumVotingPeriod,
            exists: true
        });

        emit ProposalRuleUpdated(proposalType, voteThreshold, minimumVotingPeriod);
    }

    function getProposalRule(bytes32 proposalType) external view returns (ProposalRule memory) {
        ProposalRule memory rule = rules[proposalType];
        require(rule.exists, "governance-config: missing rule");
        return rule;
    }
}
