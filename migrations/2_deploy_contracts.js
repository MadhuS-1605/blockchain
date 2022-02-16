const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  //Deploy DAPP Token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  //Transfer all tokens to TokenFarm
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfer 100 Dai tokens to investors
  await daiToken.transfer(accounts[1], '1000000000000000000000000')
}
