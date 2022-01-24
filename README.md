# os-mooncats-biddy-bots

## Prerequisites (dependencies)

To use the bot you will need to get the following set up

* Node and NVM (install on local computer)
* Infura.io (sign up for an account-- it is FREE)

### 0. Installing Node and NVM

#### Mac OS X

* [How to install for Mac OS X]()

#### Windows

* [How to install for Windows]()

#### Linux

* [How to install for Linux]()

### 1. Set Up Project on Infura.io

Sign up for a free account on[ Infura.io](https://infura.io/) and go to **create project.** Infura provides you with a free node to interact with the Ethereum network, otherwise you'd need to set up a node on your computer or separate machine (takes days).

Then navigate to Create Project

![](/infrua_create_project.png)

Name it whatever you want, but make sure to select **mainnet** for your _endpoint_ as that means you will be interacting with the ethereum network and **not** a test network like **Ropsten.**

Once, your project is created navigate to **project settings** and **copy** **project id** to a note on your computer as you will need it later in the next step.


## Running the Bot

### Create the `.env` file

Similar to the previous directions create a file name `.env` inside of the `MoonCatBot` directory.

and **paste** the following

    export INFURA_KEY="your infura api key"
    export MNEMONIC="you hot wallet seed phrase you will be bidding with"
    export MY_ADDRESS="your hot wallet address"
    export TARGET_CONTRACT_ADDRESS="acclimated mooncat contract address or wrapped address"
    export NETWORK="mainnet" 

#### Infura Key

* This is the **Project ID** you copied from Infura.io in your project settings.
  * Place yours in between the quotes (**deleting** the `your infura api key in the process)`

#### MNEMONIC

* This is your **seed phrase** to your hot wallet that is doing the bidding
  * Place yours in between the quotes (**deleting** the `your hot wallet address in the process...)`

#### My Address

* This is your **hot wallet address**

#### TARGET _CONTRACT_ ADDRESS

* These are the MoonCat Addresses
  * **acclimated:** 0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69

    **wrapped:** 0x7C40c393DC0f283F318791d746d894DdD3693572
    * Place the one you wish to bid on in between the quotes in the `.env` file

#### NETWORK

* Do nothing leave the value as is

## Running the bot

Navigate to your computer's Operating Systems version of a **Terminal** (Mac OS > Applications > terminal) and run the following commands to start the bot.

    source .env
    node bid.js

Once, the bot is running you will see an output telling you it is waiting a certain amount of time. This is because OpenSea throttles requests to the API by a lot if you don't have an API key.

As the Bot bids it will either say success or failure. It is around 60% chance of showing a failure without an API key. So do not worry. It will go through all of the token IDs for the cats and try to bid.

Do make sure to leave the **Terminal** open on your computer and make sure that the computer doesn't go to sleep. Now, you can go read a book, drink some coffee, host a space , etc.. while your bot bids for you :).