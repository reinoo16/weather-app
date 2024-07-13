import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState('');

  const API_KEY = '3414c948c0c19dc7bcdcdd25c034a436';

  const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
      )
      setWeather(response.data);
      setWeatherError('');
    } catch {
      setWeatherError('Hava durumu alınamadı.')
    }
  }

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
      )
      setWeather(response.data);
      setWeatherError('');
    } catch {
      setWeatherError('Hava durumu alınamadı.')
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      })
    } else {
      console.error('Konum tarayıcı tarafından desteklenmiyor.')
    }
  }, [])

  const translateWeatherMain = (main) => {
    switch (main) {
      case 'Clear':
        return 'Açık';
      case 'Clouds':
        return 'Bulutlu';
      case 'Rain':
        return 'Yağmurlu';
      case 'Drizzle':
        return 'Çisenti';
      case 'Thunderstorm':
        return 'Fırtına';
      case 'Snow':
        return 'Karlı';
      case 'Mist':
        return 'Sisli';
      default:
        return main;
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  }
  return (
    <div className='w-full h-full md:h-screen'>
      <div className='relative w-full h-full max-w-[840px] mx-auto px-[20px]'>
        <header className='flex flex-col items-center gap-[40px] pt-[60px] pb-[100px] md:pb-0 w-full'>
          <h1 className='font-semibold text-[26px] text-center'>Hava Durumu Uygulaması</h1>
          <div className='relative'>
            <input onKeyDown={handleKeyPress} value={city} onChange={(e) => setCity(e.target.value)} placeholder='Şehir adı girin...' className='w-full md:w-[530px] outline-none h-[50px] rounded-[26px] pl-[30px] pr-[calc(130px+30px)] text-[18px] placeholder:text-textPurple text-white font-normal bg-boxPurple' type="text" />
            <button onClick={getWeather} className='absolute right-0 top-0 bg-purple rounded-[26px] h-full px-[48px] text-[18px] font-medium text-white'>Ara</button>
          </div>
          {weatherError && (
            <p className='text-textPurple'>{weatherError}</p>
          )}
        </header>
        {weather && (<section className='flex flex-col justify-center w-full h-[calc(100%-176px)] gap-[40px] pb-[60px] md:pb-0'>
          <div className="flex flex-col-reverse md:flex-row w-full justify-between items-center gap-[40px] px-[60px]">
            <div className='flex flex-col gap-[6px]'>
              <h2 className='font-semibold text-[40px] md:text-[48px] text-white'>{weather.name}</h2>
              <h3 className='font-normal text-[32px] md:text-[40px] text-purple'>{Math.round(weather.main.temp)}°C</h3>
            </div>
            <img className='object-center object-cover w-[160px]' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png
`} alt={weather.weather[0].description} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] w-full'>
            <div className='flex items-center justify-center p-[20px] overflow-hidden w-full h-[160px] rounded-[40px] bg-boxPurple'>
              <div className="flex flex-col items-center gap-[8px]">
                <span className='font-normal text-[16px] md:text-[18px] text-textPurple'>Hava Olayı</span>
                <h4 className='font-medium text-[26px] md:text-[30px] text-white text-center'>{translateWeatherMain(weather.weather[0].main)}</h4>
              </div>
            </div>
            <div className='flex items-center justify-center p-[20px] overflow-hidden w-full h-[160px] rounded-[40px] bg-boxPurple'>
              <div className="flex flex-col items-center gap-[8px]">
                <span className='font-normal text-[16px] md:text-[18px] text-textPurple'>Rüzgar Hızı</span>
                <h4 className='font-medium text-[26px] md:text-[30px] text-white text-center'>{weather.wind.speed} km/h</h4>
              </div>
            </div>
            <div className='flex items-center justify-center p-[20px] overflow-hidden w-full h-[160px] rounded-[40px] bg-boxPurple'>
              <div className="flex flex-col items-center gap-[8px]">
                <span className='font-normal text-[16px] md:text-[18px] text-textPurple'>Nem Oranı</span>
                <h4 className='font-medium text-[26px] md:text-[30px] text-white text-center'>{weather.main.humidity}%</h4>
              </div>
            </div>
          </div>
        </section>)}
      </div>
    </div>
  );
}

export default App;
