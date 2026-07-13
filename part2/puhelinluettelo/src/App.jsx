import { useState } from 'react'

//TODO: vain yksi lista näkyvissä, refaktorointi

const App = () => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerms, setSearchTerms] = useState('')

  

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const search = (event) => {
    console.log(event.target.value)
    event.preventDefault()
    setSearchTerms(event.target.value)
  
  }
  const addPerson = (event) =>{
    event.preventDefault()
    for(let i = 0; i < persons.length; i++){
      if(newName === persons[i].name){
        alert(`${newName} is already added`)
        break;
        
      } else if(i === persons.length - 1){
        const personObject = {
          name: newName,
          number: newNumber,
        }
        setPersons(persons.concat(personObject))

      }
    }
    
    setNewName('')
    setNewNumber('')
  }
const handleAddingPerson = (event) =>{
  console.log(event.target.value)
  setNewName(event.target.value)

}

const handleAddingNumber = (event) =>{
  setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons = {persons} onChange = {search} value = {searchTerms} />
    
      <h3>Add new</h3>
      <PersonForm name = {newName} number = {newNumber} handleSubmit ={addPerson} handleAddingNumber = {handleAddingNumber} handleAddingPerson = {handleAddingPerson}/>
      
      <h3>Numbers</h3>
      <Numbers persons = {persons} searchTerms = {searchTerms}/>

      
    </div>
  )

}

const Numbers = (props) =>{
  return(
    <div>
      {(props.persons.filter((person) => 
      person.name.toLowerCase().includes(props.searchTerms.toLowerCase()))).map(person =>
        <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
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