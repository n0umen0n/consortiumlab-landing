// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ConsortiumMembership8004} from "./ConsortiumMembership8004.sol";

contract RespectGameCoreAdapter {
    struct ContributionSubmission {
        address operatorWallet;
        string[] contributions;
        string[] links;
        uint256 createdAt;
    }

    struct RankingSubmission {
        address operatorWallet;
        address[] rankedOperatorAddresses;
        uint256 createdAt;
    }

    ConsortiumMembership8004 public immutable membership;
    uint256 public contributionNonce;
    uint256 public rankingNonce;

    mapping(uint256 => ContributionSubmission) private contributionSubmissions;
    mapping(uint256 => RankingSubmission) private rankingSubmissions;

    event ContributionSubmittedByAgent(
        uint256 indexed submissionId,
        address indexed identityRegistry,
        uint256 indexed agentId,
        address operatorWallet
    );
    event RankingSubmittedByAgent(
        uint256 indexed submissionId,
        address indexed identityRegistry,
        uint256 indexed agentId,
        address operatorWallet
    );

    constructor(address membershipAddress) {
        require(membershipAddress != address(0), "respect-adapter: zero membership");
        membership = ConsortiumMembership8004(membershipAddress);
    }

    function submitContributionByAgent(
        address identityRegistry,
        uint256 agentId,
        string[] calldata contributions,
        string[] calldata links
    ) external {
        require(contributions.length > 0, "respect-adapter: empty contribution");
        address operatorWallet = _resolveAcceptedOperator(identityRegistry, agentId);

        contributionNonce += 1;
        contributionSubmissions[contributionNonce] = ContributionSubmission({
            operatorWallet: operatorWallet,
            contributions: contributions,
            links: links,
            createdAt: block.timestamp
        });

        emit ContributionSubmittedByAgent(contributionNonce, identityRegistry, agentId, operatorWallet);
    }

    function submitRankingByAgent(
        address identityRegistry,
        uint256 agentId,
        address[] calldata rankedOperatorAddresses
    ) external {
        require(rankedOperatorAddresses.length > 0, "respect-adapter: empty ranking");
        address operatorWallet = _resolveAcceptedOperator(identityRegistry, agentId);

        rankingNonce += 1;
        rankingSubmissions[rankingNonce] = RankingSubmission({
            operatorWallet: operatorWallet,
            rankedOperatorAddresses: rankedOperatorAddresses,
            createdAt: block.timestamp
        });

        emit RankingSubmittedByAgent(rankingNonce, identityRegistry, agentId, operatorWallet);
    }

    function getContributionSubmission(uint256 submissionId) external view returns (ContributionSubmission memory) {
        return contributionSubmissions[submissionId];
    }

    function getRankingSubmission(uint256 submissionId) external view returns (RankingSubmission memory) {
        return rankingSubmissions[submissionId];
    }

    function _resolveAcceptedOperator(address identityRegistry, uint256 agentId) internal view returns (address operatorWallet) {
        require(membership.isAcceptedAgent(identityRegistry, agentId), "respect-adapter: agent not accepted");
        operatorWallet = membership.getOperatorForAgent(identityRegistry, agentId);
        require(operatorWallet != address(0), "respect-adapter: operator missing");
    }
}
