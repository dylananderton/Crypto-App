import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Crypto/Coin';


function App() {

  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className='container'>
        <div className="coin-search">
          <h1 className="coin-text">Crypto App</h1>
          <form action="">
            <input type="text" className="coin-input" placeholder="Search any coin" onChange={handleChange}/>
          </form>
        </div>
      </div>

      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
          />
        );
      })}
      <a className='source-code container' href='https://github.com/dylananderton/Crypto-App' target='_blank'><p className='source-code-text'>See the source code</p></a>
    </div>
  );
}

export default App;