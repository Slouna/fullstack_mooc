import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerms, setSearchTerms] = useState('')

  useEffect(() => {
      countryService
        .getAll()
        .then(response => {
          setCountries(response.data)
        })
    }, [])

    const search = (event) => {
    console.log(event.target.value)
    event.preventDefault()
    setSearchTerms(event.target.value)
  
  }
  


  return (
    <div>
    <div>Type to search</div>
    <Filter countries = {countries} onChange = {search} value = {searchTerms} />
    <Countries countries = {countries} searchTerms= {searchTerms} setSearchTerms = {setSearchTerms}/>
    </div>

  )
}

const Filter = (props) =>{

  return(
    <div >
      <form onChange={props.onChange} onSubmit={e => { e.preventDefault(); }}>
        <div>
          Type to filter: <input value={props.value}
          onChange={props.onChange} />
          </div> 
      </form>
    </div>
    
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const Countries = (props) => {
  const filtered = props.countries.filter((country) => 
      country.name.common.toLowerCase().includes(props.searchTerms.toLowerCase()))

  if (filtered.length > 10){
    return(
      <div>Too many matches, please specify</div>
    )
  }
  if(filtered.length < 10 && filtered.length > 1){
    return(
    <div>
      {filtered.map(country =>
        <div key={country.name.common}>{country.name.common} 
        {<Button name="Show" onClick={() => props.setSearchTerms(country.name.common)} />}</div>)}
    </div>
  )
  } if (filtered.length === 1){
    const country = filtered[0]
    
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} />

        <Weather capital={country.capital}/>
      </div>
    )
  } else{
    return (
      <div>No matches</div>
    )
  }
  
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(capital)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])
  console.log(weather?.weather[0].main)

  return (
    <div>
      <h2>Weather</h2>

      <h4>{weather?.weather[0].main}</h4>
      <p>Temperature: {weather?.main.temp} Celsius</p>
      <p>Wind: {weather?.wind.speed} m/s</p>
    </div>
  )
}

export default App
