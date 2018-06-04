pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/token/ERC20/ERC20.sol';


contract TokenOperations {

    modifier tokensTransferable(address token, address sender, address receiver, uint amount) {
        require(amount > 0);
        require(ERC20(token).allowance(sender, receiver) >= amount);
        _;
    }


    function sendTokens(
        address token,
        address receiver,
        uint amount
    )
        external
        //tokensTransferable(token, msg.sender, receiver, amount)
        returns (bool res)
    {
        
        if (!ERC20(token).transferFrom(msg.sender, receiver, amount))
            revert();
        return true;

    }

}
