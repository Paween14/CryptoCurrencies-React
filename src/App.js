import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import SortButtons from './components/SortButtons';
import ResultList from './components/ResultList';

export default class App extends Component {
  state = {
    cryptos: [],
    loading: true,
    result: [],
    ascendingName: false,
    ascendingRank: true,
    ascendingPrice: true,
    searchValue: ''
  }

  componentDidMount(){
    this.getData();
    console.log('from didMount');
    

  }

  getData = () => {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=2000`)
      .then(response => {
        this.setState({
          cryptos: response.data,
          loading: false,
          result: response.data,
          ascendingName: false,
          ascendingRank: true,
          ascendingPrice: true,
          searchValue: ''
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  performSearch = (inputValue) => {    
    // can search by name, symbol
    console.log(inputValue.toLowerCase());
    
    if (inputValue.length === 1) {
        let firstChar = this.state.cryptos.filter((crypto) => {
            let name = crypto.name.toLowerCase()[0] === inputValue;
            let symbol = crypto.symbol.toLowerCase()[0] === inputValue;
            return name || symbol;
        })
        this.setState({
          result: firstChar
        });
    } else if (inputValue.length > 1) {
        let includingWord = this.state.cryptos.filter((crypto) => {
            let name =  crypto.name.toLowerCase().includes(inputValue);
            let symbol =  crypto.symbol.toLowerCase().includes(inputValue);
            return name || symbol;         
        })
        this.setState({
          result: includingWord
        });
    } else if (inputValue === '') {  //for empty search value
        /* this.setState({
          result: this.state.cryptos
        }); */
        this.getData();
    }     
  }

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  }

  sortByName = () => {
    let sortByName;
    if ( this.state.ascendingName === false ) {
      sortByName = this.state.result.sort((a, b) => 
        // a.name === b.name ? 0 : a.name < b.name ? -1 : 1
        a.symbol.localeCompare(b.symbol)
      );
      this.setState({
        ascendingName: true
      });
    } else {
      sortByName = this.state.result.sort((a, b) => 
        // a.name === b.name ? 0 : a.name > b.name ? -1 : 1
        b.symbol.localeCompare(a.symbol)
      );
      this.setState({
        ascendingName: false
      });
    }
    return this.setState({
      result: sortByName,
      searchValue: ''
    });
  }

  sortByRank = () => {
    let sortByRank;
    if ( this.state.ascendingRank === false ) {
      sortByRank = this.state.result.sort((a, b) => a.rank - b.rank)
      this.setState({
        ascendingRank: true
      });
    } else {
      sortByRank = this.state.result.sort((a, b) => b.rank - a.rank)
      this.setState({
        ascendingRank: false
      });
    }
    return this.setState({
      result: sortByRank,
      searchValue: ''
    });
  }

  sortByPrice = () => {
    let sortByPrice;
    if ( this.state.ascendingPrice === false ) {
      sortByPrice = this.state.result.sort((a, b) => a.price_usd - b.price_usd)
      this.setState({
        ascendingPrice: true
      });
    } else {
      sortByPrice = this.state.result.sort((a, b) => b.price_usd - a.price_usd)
      this.setState({
        ascendingPrice: false
      });
    }
    return this.setState({
      result: sortByPrice,
      searchValue: ''
    });
  }

  redOrGreenNumber = (value) => {
    let number = parseFloat(value).toFixed(2);
    let color;
    if(number >= 0) {
      color = {
        color: '#60be68'
      };
    } else { 
      color = {
        color: '#dd0d0d' 
      }
    }

    return (
      <p style={color} >Change(24h): <span>{ this.numberWithCommas(number) }%</span></p>
    );
  }

  numberWithCommas = (x) => {
    if (x === null) {
        return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div>
        <header>
          <div className="title">
            <h1>Cryptocurrencies</h1>
            <p>Default: sorted by rank#</p>
          </div>
          <SearchBar 
            searchValue={ this.state.searchValue }
            onChange={ this.handleChange }
            onSearch={ this.performSearch } 
          />
        </header>
        <main>
          <SortButtons 
            sortByName={ this.sortByName } 
            sortByRank={ this.sortByRank } 
            sortByPrice={ this.sortByPrice }
            refreshButton={ this.getData }
          />
          {
            (this.state.loading)
            ? <p className="loading-sign">Loading...</p>
            : <ResultList 
                data={ this.state.result } 
                redOrGreenNumber={ this.redOrGreenNumber }
                numberWithCommas={ this.numberWithCommas }
              />  
          }
        </main>
      </div> 
    );
  }
}


/* Your application will provide the following information:
·         the number of cryptocurrency coins
·         the name of the coins
·         the price of the coin
·         the rank of the coin
·         the change in price of the coin

Features
1.       Display cryptocurrency coins with the required information
2.       Filter the coins by name using input element

Additional Features:
Sort by name
Sort by price
Sort by rank

*/


