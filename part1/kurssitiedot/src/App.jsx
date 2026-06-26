const App = () => {
  const course = 'Half Stack application development'

  const part1 = <Part partName = {'Fundamentals of React'} exercises = {10}/>
  const part2 = <Part partName = {'Using props to pass data'} exercises = {7}/>
  const part3 = <Part partName = {'State of a component'} exercises = {14}/>

  let parts = [part1, part2, part3]
  return (
    
    <div>
      <Header courseName = 'Half Stack application development'/>
      <Content partList = {parts}/>
      <Total exercises = {[part1.props.exercises, part2.props.exercises, part3.props.exercises]}/>
    </div>
  )
}

const Header = (props) => {
  return(<h1>{props.courseName}</h1>)
}

const Content = (props) => {
  
  console.log(props.partList[0].props.partName)
  return (
    <div>
      <p>{props.partList[0].props.partName} {props.partList[0].props.exercises}</p>
      <p>{props.partList[1].props.partName} {props.partList[1].props.exercises}</p>
      <p>{props.partList[2].props.partName} {props.partList[2].props.exercises}</p>
    </div>
  )

}

const Total = (props) => {
  return (
      <p>Number of exercises: {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
}

const Part = (props) => {
  return <p>{props.partName} {props.exercises}</p>
}


export default App