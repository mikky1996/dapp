import React, { Component } from 'react'
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css'

class App extends Component {

  async componentWillMount() {

    await this.loadWeb3()
    await this.loadBlockChainData()

  }

  async loadBlockChainData() {

    const web3 = window.web3
    const accounts = await web3.eth.requestAccounts()

    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {

      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })

      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      console.log("tokenBalance", tokenBalance.toString())

      this.setState({tokenBalance: tokenBalance.toString()})

    } else {
      window.alert('Token contract was not deployed to selected network')
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {

      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })

    } else {
      window.alert('EthSwap contract was not deployed to selected network')
    }

    console.log(this.state)

    this.setState({loading: false})

  }

  async loadWeb3() {

    if (window.etherium) {
      window.web3 = new Web3(window.etherium)
      await window.etherium.enable()
    }

    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }

    else {
      window.alert('Non-Etherium browser detected! You should consider using MetaMask!')
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true,
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {

    let content

    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main />
    }

    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
