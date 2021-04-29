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

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
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
    }
}
