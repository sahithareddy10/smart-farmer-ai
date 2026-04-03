import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

function TaskTracker(){

const[date,setDate] = useState(new Date())
const[task,setTask] = useState("")
const[tasks,setTasks] = useState([])

const addTask = ()=>{

setTasks([...tasks,{date:date.toDateString(),task}])
setTask("")

}

return(

<div className="card">

<h2>Farm Task Calendar</h2>

<Calendar onChange={setDate} value={date}/>

<input
value={task}
onChange={(e)=>setTask(e.target.value)}
placeholder="Task"
/>

<button onClick={addTask}>Add Task</button>

<ul>

{tasks.map((t,i)=>(
<li key={i}>{t.date} — {t.task}</li>
))}

</ul>

</div>

)

}

export default TaskTracker