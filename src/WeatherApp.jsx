import { useState } from "react"

export const WeatherApp = () => {

  const url = "https://api.openweathermap.org/data/2.5/weather"
  const API_KEY = import.meta.env.VITE_API_KEY
  const celsius = 273.15

  const [city, setCity] = useState("")
  const [climate, setClimate] = useState(null)
  const [error, setError] = useState(false)
  const [isCelsius, setisCelsius] = useState(true)

  const handleCity = (e) => {
      setCity(e.target.value)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(city.length > 0)
      fetchWeather()
  }

  const fetchWeather = async () => {
    try{
        const response = await fetch(`${url}?q=${city}&appid=${API_KEY}`)
        const data = await response.json()
        if (data.cod === "404"){
              setError(true)
              setCity("")
              setClimate("")
        } else{
          setError(false)
          setClimate(data)
          setCity("")
        }
        
    }catch (error){
      
    }
  }

  const getClassName = (main) => {
    switch(main) {
        case "Clear": return "sunny"
        case "Clouds": return "cloudy"
        case "Rain": return "rainy"
        default: return "sunny"
    }
}

  return (

    <div className={climate ? getClassName(climate.weather[0].main) : "sunny"}>
      
      <h1 className="title">WeatherApp</h1>
      
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        value={city}
        onChange={handleCity}>
        </input>
        <button type='submit'>Find</button>
        <button  type='button' className="temp" onClick={() => setisCelsius(!isCelsius)}>{isCelsius ? "F°" : "C°"}</button>
      </form>

      {error ? <h1>City not found!</h1> : null}
        
        {climate && (
          <div className="form">
            <h2>{climate.name}</h2>
            {isCelsius ? <p>Temperature: {parseInt(climate.main.temp - celsius)}°C</p> : <p>Temperature: {parseInt((climate.main.temp - celsius) * 1.8 + 32)}°F</p>}
            <p>{climate.weather[0].description}</p>
            <p>Humidity: {climate.main.humidity}%</p>
            <p>Wind speed: {climate.wind.speed}km/h</p>
          </div>
        )}  
    </div>
  )
}