//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Doge is ERC20 {
    constructor() ERC20('DOGE','Doge'){
        _mint(msg.sender, 5000 * 10**18);
        
    }
} 