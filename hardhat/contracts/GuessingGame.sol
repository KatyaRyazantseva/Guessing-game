// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GuessingGame is Ownable {
    bytes32 public secretNumber;
    IERC20 public guessingToken;

    event Winner(address indexed player, uint256 prize);
    event Loser(address indexed player, uint256 amountAdded);

    constructor(address initialOwner, address guessingTokenAddress, bytes32 _secretNumber) Ownable(initialOwner) {
        guessingToken = IERC20(guessingTokenAddress);
        secretNumber = _secretNumber;
    }

    function guess(uint256 _guess) public payable returns(bool) {
        require(msg.value == 0.001 ether, "Must send 0.001 ETH to play");
        if (keccak256(abi.encodePacked(_guess)) == secretNumber) {
            uint256 prize = address(this).balance * 80 / 100;
            payable(msg.sender).transfer(prize);
            guessingToken.transferFrom(address(this), msg.sender, 100 ether);
            emit Winner(msg.sender, prize);
            return true;
        } else {
            emit Loser(msg.sender, msg.value);
            return false;
        }
    }

    function setSecretNumber(uint256 _newSecretNumber) public {
        require(msg.sender == owner(), "Only the owner can change the secret number");
        secretNumber = keccak256(abi.encodePacked(_newSecretNumber));
    }
}
