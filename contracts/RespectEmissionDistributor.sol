// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IRespectOracle} from "./interfaces/IRespectOracle.sol";
import {ConsortiumTokenVesting} from "./ConsortiumTokenVesting.sol";

contract RespectEmissionDistributor {
    address public immutable admin;
    IRespectOracle public immutable respectOracle;
    ConsortiumTokenVesting public immutable vesting;

    uint256 public perOperatorEpochCapBps = 3_500;
    uint256 public newcomerCapBps = 1_500;
    uint256 public newcomerRespectThreshold = 50;
    uint256 public rolloverAmount;

    mapping(uint256 => bool) public finalizedEpochs;

    event EpochFinalized(uint256 indexed epochId, uint256 emissionAmount, uint256 rolloverAmount);
    event AllocationCreated(uint256 indexed epochId, address indexed operator, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "emission: only admin");
        _;
    }

    constructor(address admin_, address respectOracle_, address vesting_) {
        require(admin_ != address(0), "emission: zero admin");
        require(respectOracle_ != address(0), "emission: zero oracle");
        require(vesting_ != address(0), "emission: zero vesting");
        admin = admin_;
        respectOracle = IRespectOracle(respectOracle_);
        vesting = ConsortiumTokenVesting(vesting_);
    }

    function finalizeEpoch(
        uint256 epochId,
        uint256 emissionAmount,
        address[] calldata operators
    ) external onlyAdmin {
        require(!finalizedEpochs[epochId], "emission: epoch finalized");
        require(emissionAmount > 0, "emission: zero emission");
        require(operators.length > 0, "emission: empty operator set");

        finalizedEpochs[epochId] = true;
        uint256 totalEmission = emissionAmount + rolloverAmount;
        rolloverAmount = 0;

        uint256 totalRespectEarned;
        uint256[] memory respectEarned = new uint256[](operators.length);
        for (uint256 i = 0; i < operators.length; i++) {
            uint256 respect = respectOracle.getRespectEarned(epochId, operators[i]);
            respectEarned[i] = respect;
            totalRespectEarned += respect;
        }
        require(totalRespectEarned > 0, "emission: zero respect");

        uint256 distributed;
        for (uint256 i = 0; i < operators.length; i++) {
            uint256 reward = (totalEmission * respectEarned[i]) / totalRespectEarned;

            uint256 perOperatorCap = (totalEmission * perOperatorEpochCapBps) / 10_000;
            if (reward > perOperatorCap) {
                rolloverAmount += reward - perOperatorCap;
                reward = perOperatorCap;
            }

            if (respectEarned[i] < newcomerRespectThreshold) {
                uint256 newcomerCap = (totalEmission * newcomerCapBps) / 10_000;
                if (reward > newcomerCap) {
                    rolloverAmount += reward - newcomerCap;
                    reward = newcomerCap;
                }
            }

            if (reward > 0) {
                distributed += reward;
                vesting.createGrant(operators[i], reward, 8 weeks, 40 weeks);
                emit AllocationCreated(epochId, operators[i], reward);
            }
        }

        if (distributed < totalEmission) {
          rolloverAmount += totalEmission - distributed;
        }

        emit EpochFinalized(epochId, totalEmission, rolloverAmount);
    }
}
