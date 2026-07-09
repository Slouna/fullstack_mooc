const Course = (props) =>{
    return(
      <div>
        <Header course = {props.course.name}/>
        <Content parts = {props.course.parts} />
        <Total exercises = {props.course.parts}/>
      </div>
    )
}

const Total = (props) =>{ 
    console.log("total", props)
    const totalNumber = props.exercises.reduce((total, currentValue) => total = total + currentValue.exercises, 0);
    console.log(totalNumber)
    return (
    <p>Number of exercises {totalNumber}</p>
    )
}

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
  

export default Course