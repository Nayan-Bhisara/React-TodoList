import { useState } from "react"

const Todo = () =>{
    const [task,setTask] = useState("")
    const [alltask,setAlltask] = useState([])
    const handlesubmit = (event) =>{
        event.preventDefault()
        if(!task){
            alert("Please enter a task");
            setTask("")
            return false;
        }
        let dup = alltask.find(item => item.task === task);
        if(dup){
            alert("Task already exists");
            setTask("")
            return false;
        }
        let obj = {
            uid : Date.now(),
            task,
            status : 'pending'
        }
        let newrecord = [...alltask,obj]
        setAlltask(newrecord)
        alert("task add");
        setTask("")
    }

    const completeTodo = (id) => {
        let updatestatus = alltask.map((c) => {
            if(c.uid == id){
                c.status = "completed"
            }
            return c
        })
        setAlltask(updatestatus)
        alert("status changed")
    }

    const deleteTask = (id) =>{
        setAlltask(alltask.filter(item =>item.uid != id))
        alert("delete task")
    }

    return (
        <div align="center">
            <h2>Simple Todo List</h2>
            <form onSubmit={handlesubmit}>
                Task :{""}
                <input type="text" onChange={ (event) => setTask(event.target.value)} value={task}/>
                <input type="submit" />
            </form>
            <br></br>
            <h2>view Task</h2>
            <table class="table">
            <thead class="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    alltask.map((item) => {
                        const {uid,task,status} = item;
                        return (
                            <tr key={uid}>
                                <td>{uid}</td>
                                <td>{task}</td>
                                <td>{status}</td>
                                <td>
                                    <button disabled={status == "completed"} onClick={ () => completeTodo(uid)}>complete</button> || 
                                    <button onClick={ () => deleteTask(uid)}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    )

}

export default Todo