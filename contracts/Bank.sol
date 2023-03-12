//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract Bank{

    uint totalSupply;
    uint256 constant public waitTime = 1440 minutes;
     mapping(address => uint256) lastAccessTime;

    function deposit() public payable{

        totalSupply += msg.value; 
    }
    
    function withdraw(uint _amount) public payable {
       
        require(totalSupply>= _amount, "Not enough ether");
        require(allowedToWithdraw(msg.sender), "Not allowed to withdraw before 1 day");
        totalSupply -= _amount;
        (bool sent, bytes memory data) = msg.sender.call{value: _amount}("Sent");
        require(sent, "failed to send ETH");
        lastAccessTime[msg.sender] = block.timestamp + waitTime;

    }


    function allowedToWithdraw(address _address) public view returns (bool) {
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }

}