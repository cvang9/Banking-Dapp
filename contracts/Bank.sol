//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Bank {
    address owner;
    bytes32[] public whitelistedSymbols;
    mapping(bytes32 => address) public whitelistedTokens;          // maps the symbol to token contract address
    mapping(address => mapping( bytes32 => uint)) public balances;   //  outer address - wallet address  inner  bytes32 is symbol and uint is no of tokens 

    constructor(){
        owner = msg.sender;
    }

    function whitelistToken( bytes32 symbol, address tokenAddress ) external{
        require(msg.sender == owner, "This fxn is not Public");
        whitelistedSymbols.push(symbol);
        whitelistedTokens[symbol] = tokenAddress;
    }

    function getWhitelistedSymbols() external view returns(bytes32[] memory){
        return whitelistedSymbols;
    }

    function getWhitelistedTokenAddress(bytes32 _symbol) external view returns(address){
        return whitelistedTokens[_symbol];
    }

    receive() external payable{
        balances[msg.sender]['Eth'] += msg.value;
    }

    function withdrawEther(uint _amount) external{
        require(balances[msg.sender]['Eth'] >= _amount,"Insufficient funds");
        balances[msg.sender]['Eth'] -= _amount;
       (bool sent, ) =  payable(msg.sender).call{value: _amount}("");
       require(sent,"Transaction Failed");
    }

    function depositTokens(uint _amount, bytes32 symbol) external{
        balances[msg.sender][symbol] += _amount;
        IERC20(whitelistedTokens[symbol]).transferFrom(msg.sender, address(this), _amount);
    }

    function withdrawTokens(uint _amount, bytes32 _symbol) external{
        require(balances[msg.sender][_symbol] >= _amount,"Insufficient Amount");

        balances[msg.sender][_symbol] -= _amount;
        IERC20(whitelistedTokens[_symbol]).transfer(msg.sender, _amount);
    }

    function getTokenBalance( bytes32 _symbol) external view returns(uint){
        return balances[msg.sender][_symbol];
    }



}

