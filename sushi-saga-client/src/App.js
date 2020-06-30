import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"
const START_BALANCE = 100

class App extends Component {

  state = {
    allSushis:[],
    nextBeltPosition:0,
    balance: START_BALANCE,
    plates:[],
    beltSushis:[],
  }

  currentSushis=()=>{
    const {allSushis, beltPosition} = this.state
    const beltSushis = allSushis.slice(beltPosition, beltPosition+4).map(
      sushi => {return {...sushi , eaten:false}}
    )
    return beltSushis
  }

  getSushis =() =>{
    const {nextBeltPosition} = this.state
    console.log(`fetching sushis from position ${nextBeltPosition}`)
    fetch(API)
    .then(resp=> resp.json())
    .then(data =>{
      const beltSushis = data.slice(nextBeltPosition, nextBeltPosition+4).map(
        sushi => {return {...sushi , eaten:false}}
      )
      
      this.setState({
        beltSushis:beltSushis,
        nextBeltPosition:  ((nextBeltPosition + 4) % data.length)  
      })
    
    })

  }

  buySushi=(sushiKey)=>{
    const {balance, plates,beltSushis,} = this.state
    const sushi = beltSushis[sushiKey]

    console.log(sushiKey)

    if(balance >= sushi.price){
      beltSushis[sushiKey].eaten = true
      console.log(beltSushis)
      this.setState({
        balance: balance-sushi.price,
        plates: [...plates, sushi],
        beltSushis: beltSushis
      })
      return true;
    } else {
      alert("Insufficient funds.")
      return false;
    }
  }




  

  componentDidMount =()=>{
    this.getSushis()

  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.state.beltSushis}
          getSushis={this.getSushis}
          buySushi={this.buySushi}
        />
        <Table 
          balance={this.state.balance}
          plates={this.state.plates}
        />
      </div>
    );
  }
}

export default App;