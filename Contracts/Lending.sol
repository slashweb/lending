// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lending {

    address private owner;

    // General struct to define users
    struct User {
        string worldCoinId;
        string lensHandle;
        string[] wallets;
        uint[] products;
    }

    // General struct to define products
    struct Product {
        string owner;
        string lat;
        string lng;
        string description;
        uint value;
        uint price;
        string image;
    }

    struct Rent {
        uint productId;
        string rentedBy;
        bool isApproved;
    }

    // General products mapping
    mapping (uint => Product) Products;
    // General users mapping
    mapping (string => User) Users;

    // Indexes to see what are the user products
    mapping (uint => uint[]) UserProducts;
    // Indexes to find user for specific worldcoin ID
    mapping (string => string) UserWorldCoinIds;
    // Indexes to find user for the given wallet
    mapping (string => string) UserWallets;
    // Indexes to find user for the given lens handle
    mapping (string => string) UserLensHandles;

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
    function doesKeyExist(string memory key, string memory variable) public view returns (bool) {

        if (compareStrings(variable, 'userWallets')) {
            return keccak256(abi.encodePacked(UserWallets[key])) != keccak256(abi.encodePacked(""));
        }

        if (compareStrings(variable, 'userLens')) {
            return keccak256(abi.encodePacked(UserLensHandles[key])) != keccak256(abi.encodePacked(""));
        }

        if (compareStrings(variable, 'userWCID')) {
            return keccak256(abi.encodePacked(UserWorldCoinIds[key])) != keccak256(abi.encodePacked(""));
        }

        return false;
    }
    
    // Function to define all the wallets to specified user
    function assignWalletsToUser(string[] memory _addresses, string memory userId) public {
        for(uint i=0; i< _addresses.length; i++) {
            string memory wallet = _addresses[i];
            if (!doesKeyExist(wallet, 'userWallets')) {
                UserWallets[wallet] = userId;
                Users[userId].wallets.push(wallet);
            }
        }
    }

    function assignLensToUser(string memory _lens, string memory userId) public {
        if (!doesKeyExist(_lens, 'userLens')) {
            UserLensHandles[_lens] = userId;
            Users[userId].lensHandle = _lens;
        }
    }

    function assignWorldCoinIdToUser(string memory WCID, string memory userId) public {
        if (!doesKeyExist(WCID, 'userWCID')) {
            UserWorldCoinIds[WCID] = userId;
            Users[userId].worldCoinId = WCID;
        }
    }

    function createUserAccount(string memory username, string[] memory _addresses) public returns (User memory) {
        uint[] memory products;

        // Assign the new instance of the user
        Users[username] = User('', '', _addresses, products);
        // Define all wallets that got from user to defined username
        assignWalletsToUser(_addresses, username);
        // Return the instance of the new user
        return Users[username];
    } 

    function getUserById(string memory userId) public view returns (User memory) {
        return Users[userId];
    }

    function getUserByLens(string memory lens) public view returns (User memory) {
        string memory userId = UserLensHandles[lens];
        return Users[userId];
    }

    function getUserByWorldCoin(string memory WCID) public view returns (User memory) {
        string memory userId = UserWorldCoinIds[WCID];
        return Users[userId];
    }

    function getUserByWallet(string memory addr) public view returns (User memory) {
        string memory userId = UserWallets[addr];
        return Users[userId];
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function makeRentRequest() public {

    }

} 