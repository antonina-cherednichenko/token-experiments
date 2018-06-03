var contract = require('truffle-contract')
var Web3 = require('web3');

var config = require('./config.js')

let web3 = new Web3(new Web3.providers.HttpProvider(config.blockchainNodeAdrress));

var TESTC = contract(require('../../build/contracts/TestToken.json'));
var OPERATIONSC = contract(require('../../build/contracts/TokenOperations.json'));

TESTC.setProvider(web3.currentProvider)
//dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof TESTC.currentProvider.sendAsync !== "function") {
  TESTC.currentProvider.sendAsync = function() {
    return TESTC.currentProvider.send.apply(
      TESTC.currentProvider, arguments
    );
  };
}

var OPERATIONSC = contract(require('../../build/contracts/TokenOperations.json'))
OPERATIONSC.setProvider(web3.currentProvider)
//dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof OPERATIONSC.currentProvider.sendAsync !== "function") {
  OPERATIONSC.currentProvider.sendAsync = function() {
    return OPERATIONSC.currentProvider.send.apply(
      OPERATIONSC.currentProvider, arguments
    );
  };
}

// Get the initial accounts
web3.eth.getAccounts(function(err, accs) {
  if (err != null) {
    console.error("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }

  part1 = accs[1];
  part2 = accs[0];


  let tokenI, operationsI;
  deployContracts()
    .then(res => {
       tokenI = res.tokenI;
       operationsI = res.operationsI;
     })
    .then(() => {
      return operationsI.sendTokens(tokenI.address, part2, 100)
    })
    .then(res => console.log("RES = ", res))
}


function deployContracts() {
  let tokenI, operationsI;

  return TESTC.deployed()
   .then(instance => tokenI = instance)
   .then(() => OPERATIONSC.deployed())
   .then(instance => {
     operationsI = instance;
     return { tokenI: tokenI, operationsI: operationsI}
   })
   .catch(err => console.error("Deployment of OPERATIONSC and TESTC failed with an error = ", err))
}
