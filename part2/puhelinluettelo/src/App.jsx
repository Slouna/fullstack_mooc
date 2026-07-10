import { useState } from 'react'

const App = () => {
  
  const [newName, setNewName] = useState('')

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: '123',
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
const handleAddingPerson = (event) =>{
  console.log(event.target.value)
  setNewName(event.target.value)

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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          {person.name}
          </div>)}
    </div>
  )

}

export default App