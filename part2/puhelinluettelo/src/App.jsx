import { useState } from 'react'

const App = () => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleAddingPerson} />
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleAddingNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
          </div>)}
    </div>
  )

}

export default App