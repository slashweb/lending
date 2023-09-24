// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lending {

    address private owner;

    uint public lasProductId = 0;
    uint public lastRentId = 0;

    // Variables to that we can retreive all data to the Front End
    uint[] public allProductsIds;
    uint[] public allRentsIds;

    // General struct to define users
    struct User {
        string userId;
        string worldCoinId;
        string lensHandle;
        string[] wallets;
        uint[] products;
        uint[] myLendings;
        uint[] myBorrowings;
    }

    // General struct to define products
    struct Product {
        uint id;
        string userId;
        string lat;
        string lng;
        string name;
        string description;
        uint prodValue;
        uint price;
        string image;
    }

    struct Rent {
        uint id;
        uint productId;
        string owner;
        string rentedBy;
        bool isApproved;
        bool isReturned;
        string incidence;
    }

    // General products mapping
    mapping (uint => Product) private Products;
    // General users mapping
    mapping (string => User) private Users;
    // General rents mapping
    mapping (uint => Rent) private Rents;
    
    // Indexes to see the user ratings
    mapping (string => uint[]) UserRatings;
    // Indexes to see the user who rents ratings
    mapping (string => uint[]) TenantRatings;
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
            for (uint i = 0; i < bytes(a).length; i++) {
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
        UserLensHandles[_lens] = userId;
        Users[userId].lensHandle = _lens;
    }

    function assignWorldCoinIdToUser(string memory WCID, string memory userId) public {
        if (!doesKeyExist(WCID, 'userWCID')) {
            UserWorldCoinIds[WCID] = userId;
            Users[userId].worldCoinId = WCID;
        }
    }

    function createUserAccount(string memory username, string[] memory _addresses) public returns (User memory) {
        uint[] memory products;
        uint[] memory rents;

        // Assign the new instance of the user
        Users[username] = User(username,'', '', _addresses, products, rents, rents);
        // Define all wallets that got from user to defined username
        assignWalletsToUser(_addresses, username);
        // Return the instance of the new user
        return Users[username];
    } 

    function getUserById(string memory userId) public view returns (User memory) {
        return Users[userId];
    }

    function getProductById(uint productId) public view returns (Product memory) {
        return Products[productId];
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

    function getAllProducts() public view returns (uint[] memory) {
        return allProductsIds;
    }

    function getAllRents() public view returns (uint[] memory) {
        return allRentsIds;
    }

    
    function makeRentRequest(
        string memory lending, 
        string memory borowing,
        uint productId
    ) public {
        Rents[lastRentId] = Rent(
            lastRentId,
            productId,
            lending, 
            borowing,
            false,
            false,
            ''
        );

        Users[lending].myLendings.push(Rents[lastRentId].id);
        Users[borowing].myBorrowings.push(Rents[lastRentId].id);
        allRentsIds.push(lastRentId);
        lastRentId ++;
    }

    function approveRent(bool status, uint rentId) public {
        Rents[rentId].isApproved = status;
    }

    function returnRent(bool status, uint rentId) public {
        Rents[rentId].isReturned = status;
    }

    function setIncidence(string memory _incidence, uint rentId) public {
        Rents[rentId].incidence = _incidence;
    }

    function getRent(uint rentId) public view returns (Rent memory) {
        return Rents[rentId];
    }

    function createProduct(
        string memory _userId,
        string memory _lat,
        string memory _lng,
        string memory _name,
        string memory _description,
        uint _productValue, 
        uint _price,
        string memory _image
    ) public  {
        // First we ensure that the user exists
        //User memory selectedUser = getUserById(_userId);

        // When the user exists now we create new instance of the Product
        Products[lasProductId] = Product(
            lasProductId,
            _userId,
            _lat,
            _lng,
            _name,
            _description,
            _productValue,
            _price,
            _image
        );

        Users[_userId].products.push(lasProductId);
        allProductsIds.push(lasProductId);
        lasProductId ++;
    }
} 