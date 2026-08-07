const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
      },
]

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook</h1>')
})

app.get('/info', (request, response) => {
  const now = new Date();
  response.send(`
  <div>
  <p>Phonebook has info for ${persons.length + 1} people</p>
  <p>${now}</p>
  </div>`)
})

//listaa kaikki
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//palauttaa halutun henkilön
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.round(Math.random()*30000000)
    const person = request.body

    if(!person.name){
      return response.status(400).json({ 
        error: 'Name is missing' 
      })
    }

    if (!person.number){
      return response.status(400).json({ 
        error: 'Number is missing' 
      })
    }

    if (persons.some(p => p.name === person.name)){
      return response.status(400).json({ 
        error: 'Every name must be unique' 
      })
    }



    person.id = String(id)
    
    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })