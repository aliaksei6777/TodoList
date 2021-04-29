
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}



// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '3968e2e7-ef1b-4e58-9108-d41e4dea47f4'
//     }
// }

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
        debugger;
            todolistAPI.updateTodolist(todolistId,'REACT>>>>>>>>>').then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

