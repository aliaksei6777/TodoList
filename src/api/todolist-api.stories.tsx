import React, {useEffect, useState} from 'react'
import { todolistAPI} from "./todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {setState(res.data);})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("newTodolist").then( (res) => {setState(res.data);})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b4446c95-33f9-4fb6-ae4a-a4107795c6f4';
        todolistAPI.deleteTodolist(todolistId).then( (res) => {setState(res.data);})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '537b0bc8-c85b-4b00-8fce-c86368a160c9'
            todolistAPI.updateTodolist(todolistId,'REACT>>>>>>>>>').then((res) => {setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")

    const getTasks = () => {
        todolistAPI.getTasks(todolistId).then((res) => {setState(res.data.items);})
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todolistId} placeholder={"todolist ID"} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")
    const [todolistId, setTodolistId] = useState("")
    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then( (res) => {setState(res.data);})
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todolistId} placeholder={"todolistID"} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input value={title} placeholder={"Task title"} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskID, setTaskID] = useState("")
    const [todolistId, setTodolistId] = useState("")
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId,taskID).then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input value={taskID} placeholder={"taskID"} onChange={e => setTaskID(e.currentTarget.value)}/>
            <input value={todolistId} placeholder={"todolistID"} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskID, setTaskID] = useState("")
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("title 1")
    const [description, setDescription] = useState<string>("description 1")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    let payload = {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: ""
    }
    const updateTask = () => {
        todolistAPI.updateTask(payload,todolistId,taskID).then(res => {
            console.log(res)
            return setState(res.data)
        })
    }
    return <div> {JSON.stringify(state)}

        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskID"} value={taskID} onChange={e => setTaskID(e.currentTarget.value)}/>
            <input placeholder={"Task Title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <input placeholder={"Description"} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
            status:<input placeholder={"status"} value={status} type={"number"} onChange={e => setStatus(+e.currentTarget.value)}/>
            priority:<input placeholder={"priority"} value={priority} type={"number"} onChange={e => setPriority(+e.currentTarget.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}


//
// 539bf1cf-3563-4d5a-8870-9eb3a23f641e
