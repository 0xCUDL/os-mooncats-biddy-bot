const opensea = require('opensea-js')
const OpenSeaPort = opensea.OpenSeaPort
const Network = opensea.Network
const MnemonicWalletSubprovider = require('@0x/subproviders').MnemonicWalletSubprovider
const RPCSubprovider = require('web3-provider-engine/subproviders/rpc')
const Web3ProviderEngine = require('web3-provider-engine')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const TARGET_CONTRACT_ADDRESS = process.env.TARGET_CONTRACT_ADDRESS
const MY_ADDRESS = process.env.MY_ADDRESS
const NETWORK = process.env.NETWORK

data = {
        "gutter": {
            // these are the cat id's that correspond to the orange spotted mooncats (standing pose w/smiles)
            "garf": [24180, 8987, 8260, 21571, 18131, 14773, 10174, 2210, 1502, 2283, 14314, 10467, 1130, 2090, 5610, 13995, 14927, 15174, 16894, 9587, 16604, 12347, 12008, 12806, 13967, 10673, 15896, 14239, 740, 14719, 11809, 18143, 15052, 16766, 15568, 16661, 10442, 18467, 19909, 20339, 20158, 17040, 7086, 17634, 8134, 6499, 2286, 9534, 21526, 21482, 24333, 21397, 22671, 22109, 3112, 22243, 25306, 11044, 14652, 24601, 21718, 19083]
        }
}


if (!MNEMONIC || !INFURA_KEY || !NETWORK || !MY_ADDRESS || !TARGET_CONTRACT_ADDRESS) {
    console.error('Please set a mnemonic, infura key, user address, network, and target NFT contract address.')
    return
}

// Set up the wallet and provider stuff.
const BASE_DERIVATION_PATH = `44'/60'/0'/0`
const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({ mnemonic: MNEMONIC, baseDerivationPath: BASE_DERIVATION_PATH})
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: 'https://' + NETWORK + '.infura.io/v3/' + INFURA_KEY,
})

const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(mnemonicWalletSubprovider)
providerEngine.addProvider(infuraRpcSubprovider)
providerEngine.start()


// Initialize the seaport.
const seaport = new OpenSeaPort(providerEngine, {
    networkName: NETWORK === 'mainnet' ? Network.Main : Network.Rinkeby
}, (arg) => console.log(arg))


// acclimated: "0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69"
async function main() {
    function waitforme(milisec) {
        console.log("waiting 60000 or 60s")
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, milisec);
        })
    }
    async function printy() {
        var cats = data.gutter.garf// you'd change the data you want access to here for cats data.garfiled.acclimated for example if using acclimated substitute the address 
        var arrayLength = cats.length;
        for (let i = 0; i < arrayLength; ++i) {
            console.log("making a bid on", cats[i]);
            const tokenId = cats[i]
            await waitforme(60000); // wait for 60s to avoid rate limiting if not using api key
            try {
                console.log(`Bidding on https://opensea.io/assets/${TARGET_CONTRACT_ADDRESS}/${tokenId}`)
                const buyOrder = await seaport.createBuyOrder({
                    asset: {
                        tokenId,
                        tokenAddress: "0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69" // acclimated mooncats smart contract address
                    },
                    startAmount: .30, // the amount in wETH to bid 
                    accountAddress: "<put-your-wallet-address-here>",
                    expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 3) // 3 hrs
                })
                console.log(`Successfully created a buy order! ${buyOrder.asset.openseaLink}\n`)
            } catch(e) {
                console.log('Failed:', e)
            }
        }
        console.log("Loop execution finished!)");
    }
    printy();
}

main()