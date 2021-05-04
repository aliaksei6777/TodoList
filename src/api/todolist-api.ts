import axios from "axios";


type TodoType= {
    id: string
    addedDate: string
    order: number
    title: string
}


type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type UpdateTaskType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3968e2e7-ef1b-4e58-9108-d41e4dea47f4'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string){
       return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodoType}>>('todo-lists', {title: title})
    },
    getTodolists(){
        return instance.get<TodoType[]>('todo-lists')
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskID: string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskID}`)
    },
    updateTask(payload: UpdateTaskType,todolistId: string, taskID: string){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskID}`,payload)
    }
}
