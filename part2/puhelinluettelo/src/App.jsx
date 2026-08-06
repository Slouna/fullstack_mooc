import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'


//TODO: vain yksi lista näkyvissä, refaktorointi

const App = () => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerms, setSearchTerms] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  

  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const search = (event) => {
    console.log(event.target.value)
    event.preventDefault()
    setSearchTerms(event.target.value)
  
  }
  const addPerson = (event) =>{
    event.preventDefault()
    for(let i = 0; i < persons.length; i++){
      if(newName.toLowerCase() === persons[i].name.toLowerCase()){
        //alert(`${newName} is already added`)
        if (window.confirm(`${newName} is already in phonebook. Want to update the number?`)){
          const personObject = {
            name: newName,
            number: newNumber, 
            id: persons[i].id
          }
          handleUpdatingPerson(personObject)
          setSuccess(true)
          setMessage(`${newName}'s number was updated`)
          setTimeout(() => {setMessage(null)}, 5000)
        }
        break;
        
      } else if(i === persons.length - 1){
        const personObject = {
          name: newName,
          number: newNumber,
        }
        //setPersons(persons.concat(personObject))
        personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccess(true)
          setMessage(`${newName} added to phonebook!`)
          setTimeout(() => {setMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
          
        })

      }
    }
    
    setNewName('')
    setNewNumber('')
  }
const handleAddingPerson = (event) =>{
  
  setNewName(event.target.value)

}

const handleAddingNumber = (event) =>{
  setNewNumber(event.target.value)
}

const handleUpdatingPerson = (updatedPerson) => {
  const person = persons.find(p => p.id === updatedPerson.id)
  personService.update(updatedPerson.id, updatedPerson)
  .then(response => {
    setPersons(persons.map(person => person.id != updatedPerson.id ? person : response.data))
  })
  .catch(error => {
    setSuccess(false)
    setMessage(`${updatedPerson.name} was already deleted`)
    setPersons(current =>
    current.filter(person => person.id !== updatedPerson.id)
  )
    setTimeout(() => {setMessage(null)}, 5000)
    

  })
}


const handleDeletingPerson = (id, persons) =>{
  console.log(id)
  const person = persons.find(person => person.id === id)
 
  if (window.confirm(`Delete ${person.name}? `)) {

    personService.deleteItem(id)
    .then( () => {setPersons(persons.filter(person => person.id !== id))})
    setSuccess(true)
    setMessage(`${person.name} was removed!`)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success = {success}/>
      <Filter persons = {persons} onChange = {search} value = {searchTerms} />
    
      <h3>Add new</h3>
      <PersonForm name = {newName} number = {newNumber} handleSubmit ={addPerson} handleAddingNumber = {handleAddingNumber} handleAddingPerson = {handleAddingPerson}/>
      
      <h3>Numbers</h3>
      <Numbers persons = {persons} searchTerms = {searchTerms} handleDeletingPerson={handleDeletingPerson}/>

      
    </div>
  )

}

const Numbers = (props) =>{
  return(
    <div>
      {(props.persons.filter((person) => 
      person.name.toLowerCase().includes(props.searchTerms.toLowerCase()))).map(person =>
        <div key={person.name}>{person.name} {person.number} {<Button name="delete" onClick = {() => props.handleDeletingPerson(person.id, props.persons)}/>}</div>)}
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}



const PersonForm = (props) => {
  return(
  <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.name}
          onChange={props.handleAddingPerson} />
        </div>
        <div>
          number: <input value={props.number} 
          onChange={props.handleAddingNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
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


export default App