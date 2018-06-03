var TestToken = artifacts.require('./TestToken.sol');
var TokenOperations = artifacts.require('./TokenOperations.sol');

module.exports = function(deployer) {
  deployer.deploy(TokenOperations)
  deployer.deploy(TestToken, 100000000)
}
