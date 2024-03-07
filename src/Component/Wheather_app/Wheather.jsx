import React, { useState } from 'react'
import cloud from '../../assets/cloudy.png'
import clear from '../../assets/clear.jpeg'
import drizzle from '../../assets/drizzle.jpeg'
import rain from '../../assets/rainy.png'
import snow from '../../assets/snow.png'
import wind from '../../assets/wind.png'
import humidity from '../../assets/humidity.png'
import search_icon from '../../assets/search.jpg'
import './Wheather.css';

export const Wheather = () => {

  
  let api_key = '813bded87985bafa06c65c05a6bf6e52'

  const [wicon, setWicon] = useState(cloud)

  const search =async () =>{
    const element = document.getElementsByClassName("cityName")
    if(element[0].value === '')
    {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url);

    let data = await response.json();

    
    const wind = document.getElementsByClassName("wind-rate");
    const humidity = document.getElementsByClassName("humidity-percent")
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity+"%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    temp[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;
    
    if(data.weather[0].icon == "01d" || data.weather[0].icon == "01n")
    {
      setWicon(clear)
    }
    else if(data.weather[0].icon == "02d" || data.weather[0].icon == "02n")
    {
      setWicon(cloud)
    }

    else if(data.weather[0].icon == "03d" || data.weather[0].icon == "03n")
    {
      setWicon(drizzle)
    }
    else if(data.weather[0].icon == "04d" || data.weather[0].icon == "04n")
    {
      setWicon(drizzle)
    }
    else if(data.weather[0].icon == "09d" || data.weather[0].icon == "09n")
    {
      setWicon(rain)
    }
    else if(data.weather[0].icon == "10d" || data.weather[0].icon == "10n")
    {
      setWicon(rain)
    }
    else if(data.weather[0].icon == "13d" || data.weather[0].icon == "13n")
    {
      setWicon(snow)
    }
    else{
      setWicon(clear);
    }
  }

  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className='cityName' placeholder='search' />
            <div className="search-icon" onClick={() =>{search()}}>
            <img src={search_icon} alt=""  width={'25px'}/>
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" width={'200px'} />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="" className='icon' width={'100px'} />
            <div className="data">
              <div className="humidity-percent">
                64%
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className='icon' width={'100px'}/>
            <div className="data">
              <div className="wind-rate">
              18 km/h
              </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </div>
  )
}
