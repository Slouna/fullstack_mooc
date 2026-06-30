import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (

    <div>
      <h1>Give feedback</h1>
      <Button onClick={setGood} text="Good" review = {good} />
      <Button onClick={setNeutral} text="Neutral" review = {neutral} />
      <Button onClick={setBad} text="Bad" review = {bad} />

      <h1>Statistics</h1>
      <Statistics good = {good} neutral ={neutral} bad = {bad} />
    </div>
    

  )
}

const Button = (props) =>{
  const increaseByOne = () => props.onClick(props.review + 1)
  return(
    <button onClick={increaseByOne}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive = (props.good/all)*100 + '%'

  if (all > 0){
    return(
      <table>
        <tbody>
          <tr>
            <td><StatisticsLine value={"Good"} /></td>
            <td><StatisticsLine value={props.good} /></td>
          </tr>
          <tr>
            <td><StatisticsLine value={"Neutral"} /></td>
            <td><StatisticsLine value={props.neutral} /></td>
          </tr>
          <tr>
            <td> <StatisticsLine value={"Bad"} /></td>
            <td><StatisticsLine value={props.bad} /></td>
          </tr>
          <tr>
            <td><StatisticsLine value={"All"} /></td>
            <td><StatisticsLine value={all} /></td>
          </tr>
          <tr>
            <td><StatisticsLine value={"Average"} /></td>
            <td><StatisticsLine value={average} /></td>
          </tr>
          <tr>
            <td><StatisticsLine value={"Positive"} /></td>
            <td><StatisticsLine value={positive} /> </td>
          </tr>
        </tbody>
        
      </table> 
    )
  }
  return(
    <p>No feedback given</p>
  )
}

const StatisticsLine = (props) =>{
  if(props.text == "Positive"){
    return(<p>{props.value} %</p>)
  }
  return(
    <p>{props.value}</p>
  )
}


export default App