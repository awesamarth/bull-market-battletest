//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Trap {
    
    function refund () external payable {
        
        (bool sent, ) = payable(msg.sender).call{value:msg.value}("");
        require(sent, "failed");

    }

    receive() external payable{}
    fallback() external payable{}

}