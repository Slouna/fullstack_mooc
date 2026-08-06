import { useState, useEffect } from 'react'
import countryService from './services/countries'


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
    <div>Jello</div>
    <Filter countries = {countries} onChange = {search} value = {searchTerms} />
    <Countries countries = {countries} searchTerms= {searchTerms} />
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
        <div key={country.name.common}>{country.name.common} </div>)}
    </div>
  )
  } if (filtered.length === 1){
    const country = countryService.getOne(filtered[0].name.common)
    console.log(country)
    return(
      <div>{country}</div>
    )
  } else{
    return (
      <div>No matches</div>
    )
  }
  
}

export default App
