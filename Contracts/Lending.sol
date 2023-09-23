// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lending {

    address private owner;

    struct user {
        string worldCoinId;
        string lensHandle;
        address[] wallets;
    }

    mapping (uint => user) users;

    constructor() {
        owner = msg.sender;
    }


    function getOwner() external view returns (address) {
        return owner;
    }

} 