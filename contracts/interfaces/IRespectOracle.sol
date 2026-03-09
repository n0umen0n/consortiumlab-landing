// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRespectOracle {
    function getAverageRespect(address operator) external view returns (uint256);

    function isTopMember(address operator) external view returns (bool);

    function getRespectEarned(uint256 epochId, address operator) external view returns (uint256);
}
