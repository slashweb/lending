// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lending {

    address private owner;

    // General struct to define users
    struct User {
        string worldCoinId;
        string lensHandle;
        string[] wallets;
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
    mapping (string => User) Users;

    // Indexes to see what are the user products
    mapping (uint => uint[]) UserProducts;
    // Indexes to find user for specific worldcoin ID
    mapping (string => uint user) WorldCoinId;
    // Indexes to find user for the given wallet
    mapping (string => string user) UserWallets;

    constructor() {
        owner = msg.sender;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            for (uint256 i = 0; i < bytes(a).length; i++) {
                if (bytes(a)[i] != bytes(b)[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    // Function to check if a key exists in the mapping
    function doesKeyExist(string memory key) public view returns (bool) {
        // Compare the value at the specified key to the default value (an empty string)
        return keccak256(abi.encodePacked(UserWallets[key])) != keccak256(abi.encodePacked(""));
    }
    
    // Function to define all the wallets to specified user
    function assignWalletsToUser(string[] memory _addresses, string memory userId) public {
        for(uint i=0; i< _addresses.length; i++) {
            string memory wallet = _addresses[i];
            if (!doesKeyExist(wallet)) {
                UserWallets[wallet] = userId;
            }
        }
    }

    function createUserAccount(string memory username, string[] memory _addresses) public returns (User memory) {
        User memory oldUser = Users[username];
        // Check if the user exists
        if (oldUser.wallets.length != 0) {
            return oldUser;
        }

        // Assign the new instance of the user
        Users[username] = User('', '', _addresses);
        // Define all wallets that got from user to defined username
        assignWalletsToUser(_addresses, username);
        // Return the instance of the new user
        return Users[username];
    } 

    function getOwner() external view returns (address) {
        return owner;
    }

} 