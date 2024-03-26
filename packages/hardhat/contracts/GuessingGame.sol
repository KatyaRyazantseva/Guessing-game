// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GuessingGame is Ownable {
    bytes32 public secretNumber;
    IERC20 public guessingToken;

    event Winner(address indexed player, uint256 guessNumber, uint256 prize);
    event Loser(address indexed player, uint256 guessNumber);

    constructor(address initialOwner, address guessingTokenAddress) Ownable(initialOwner) {
        guessingToken = IERC20(guessingTokenAddress);
    }

    function guess(uint256 guessNumber) public payable {
        require(msg.sender != owner(), "Owner can't play");
        require(msg.value == 0.001 ether, "Must send 0.001 ETH to play");
        if (keccak256(abi.encodePacked(guessNumber)) == secretNumber) {
            uint256 prize = address(this).balance * 80 / 100;
            (bool success,)= payable(msg.sender).call{value: prize}("");
            require(success, "Ether transfer failed");
            guessingToken.transfer(msg.sender, 100 ether);
            emit Winner(msg.sender, guessNumber, prize);
        } else {
            emit Loser(msg.sender, guessNumber);
        }
    }

    function setSecretNumber(bytes32 _secretNumber) public onlyOwner {
        secretNumber = _secretNumber;
    }

    function getPrizeAmount() public view returns(uint256) {
        return address(this).balance * 80 / 100;
    }
}
