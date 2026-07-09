const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  const parts = props.parts
  return(
    <div>
      {parts.map(part =>
      <li key = {part.id}>
       <Part part = {part}/>
        </li>)}
    </div>
  )
}

const Part = (props) => {
  
  return(
  <p>
    {props.part.name} {props.part.exercises}
  </p>
  )
}

const Course = (props) =>{
  return(
    <div>
      <Header course = {props.course.name}/>
      <Content parts = {props.course.parts} />
      <Total exercises = {props.course.parts}/>
    </div>
  )
}


//anna parts[] propsina, mappaa ja laske yhteen exet
const Total = (props) =>{ 
  console.log("total", props)
  const totalNumber = props.exercises.reduce((total, currentValue) => total = total + currentValue.exercises, 0);
  console.log(totalNumber)
  return (
  <p>Number of exercises {totalNumber}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App
