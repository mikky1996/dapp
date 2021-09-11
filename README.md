# DApp

The base was created by following [this resource](https://www.youtube.com/watch?v=sCE-fQJAVQ4)

### Code Setup:
```bash

# Install homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install Node.js (npm etc..)
brew install node
brew install truffle

# Install the library
git clone git@github.com:mikky1996/dapp.git
cd dapp
npm install

```
### BlockChain Setup:
Install one-click blockchain by following [this link](https://www.trufflesuite.com/ganache)

### Commands:
```bash
npm run start # Start react servers
truffle migrate # To deploy the smart contract
truffle migrate --reset # To redeploy the smart contract
truffle console # To pull the blockchain colose
```


