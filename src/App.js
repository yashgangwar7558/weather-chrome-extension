import React from "react"
import { useState, useEffect } from "react"
import '../src/App.css'

function App() {

  const [search, setSearch] = useState('mumbai')
  const [weatherReport, setWeatherReport] = useState([])
  const [tempReport, setTempReport] = useState(null)

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=58d43a1ecb788714b95bd2db8b21e535`
      const result = await fetch(url)
      const resultJson = await result.json()
      setWeatherReport(resultJson.weather)
      setTempReport(resultJson.main)
      console.log(resultJson.weather);
      console.log(resultJson.main);
    }
    fetchApi()
  }, [search])

  return (
    <div className="extension-body">
      <h2 className="title">My Weather</h2>
      <div className="inputData">
        <input type="search" className="inputField" onChange={(e) => { setSearch(e.target.value) }} value={search} />
      </div>
      {
        !(tempReport && weatherReport) ? (
          <div>No data found</div>
        ) : (
          <div className="weatherReport">
            <h2 className="city-title">{search}</h2>
            <h3 className="temp-title">Temp:<span className="temp">{tempReport.temp}°C</span></h3>
            <h3 className="feels-like-title">Feels like:<span className="feels-like">{tempReport.feels_like}°C</span></h3>
            <h3 className="pressure-title">Pressure:<span className="pressure">{tempReport.pressure}mBar</span></h3>
            <h3 className="humidity-title">Humidity:<span className="humidity">{tempReport.humidity}%</span></h3>
            <h3>Weather:{
              weatherReport.map((currElem) => {
                return (
                  <span className="weather">{currElem.main}</span>
                )
              })
            }</h3>
          </div>
        )
      }
    </div>
  );
}

export default App;
