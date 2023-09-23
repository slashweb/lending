// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lending {

    address private owner;

    // General struct to define users
    struct User {
        string worldCoinId;
        string lensHandle;
        address[] wallets;
    }

    // General struct to define products
    struct Product {
        string lat;
        string lng;
        string description;
        uint value;
        uint price;
        string image;
    }

    // General products mapping
    mapping (uint => Product) Products;
    // General users mapping
    mapping (uint => User) Users;

    // Indexes to see what are the user products
    mapping (uint => uint[]) UserProducts;
    // Indexes to find user for specific worldcoin ID
    mapping (string => uint user) WorldCoinId;

    constructor() {
        owner = msg.sender;
    }


    function getOwner() external view returns (address) {
        return owner;
    }

} 