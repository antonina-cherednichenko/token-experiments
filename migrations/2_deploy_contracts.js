var TestToken = artifacts.require('./TestToken.sol');
var TokenOperations = artifacts.require('./TokenOperations.sol');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(TokenOperations)
  console.log("accounts = ", accounts);
  deployer.deploy(TestToken, 100000000, {from: accounts[0]})
}
