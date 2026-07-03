import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //let votes = Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [best, setBest] = useState(0)

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  const nextAnecdote = () => setSelected(getRandomIntInclusive(0,7))

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    
    findBest(copy)
  }

  const findBest = (givenVotes) => {
    let indexOfBest = 0
    for(let i = 0; i < givenVotes.length; i++){
      if(givenVotes[i] > givenVotes[indexOfBest]){
        indexOfBest = i
      }
    }
    setBest(indexOfBest)
   
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p></p>
      <Button handleClick={voteAnecdote} text = 'Vote' />
      <Button handleClick = {nextAnecdote} text = 'Next Anecdote' />
      <p>Anecdote has {votes[selected]} votes.</p>

      <h1>Anecdote with most votes</h1>
      {anecdotes[best]}
    </div>
  )
}

const Button = (props) =>{


  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


export default App