import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3414c948c0c19dc7bcdcdd25c034a436`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('');
      setLeftMenu(!leftMenu);
    }
  }

  const [leftMenu, setLeftMenu] = useState(true);

  const changeMenu = () => {
    setLeftMenu(!leftMenu);
  }

  return (
    <div className="App">
      <div className="weather-app">
        <div className={leftMenu ? 'left' : 'responsive'}>
          <i onClick={changeMenu} class="bi bi-x-lg"></i>
          <div className="search">
            <input value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} type="text" name="" id="" placeholder="Location" />
            <i className="bi bi-search"></i>
          </div>
          <div className="weather-icon">
            {data.weather ? (<img src={`/img/${data.weather[0].icon}.svg`} alt="" />) : (<img src='/img/03d.svg' alt="" />)}
            {data.weather ? <h2>{data.weather[0].main}</h2> : <h2>Partly Cloudy</h2>}
          </div>
          <div className="weather-infos">
            <div>
              {data.main ? <p>{data.main.humidity.toFixed()}</p> : <p>%60</p>}
              <h3>Nem</h3>
            </div>
            <div>
              {data.wind ? <p>{data.wind.speed.toFixed()} Km/s</p> : <p>3 Km/s</p>}
              <h3>Rüzgar</h3>
            </div>
            <div>
              {data.main ? <p>{data.main.feels_like.toFixed()}°</p> : <p>30°</p>}
              <h3>Hissedilen</h3>
            </div>
          </div>
        </div>
        <div className='right'>
          <i onClick={changeMenu} class="bi bi-list"></i>
          <div className='right-items'>
            <div className='temp-city'>
              {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : <h1>32°</h1>}
              {data.name ? <h2>{data.name}</h2> : <h2>BURSA</h2>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

