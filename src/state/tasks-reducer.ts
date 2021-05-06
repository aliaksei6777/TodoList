import {addTodolistActionType, RemoveTodoListActionType, setTodolistActionType} from "./todolists-reducer";
import {TaskType, todolistAPI} from "../api/todolist-api";
import {AppRootStateType, AppThunk} from "./store";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type addTaskActionType = ReturnType<typeof addTaskAC>
type updateTaskActionType = ReturnType<typeof updateTask>
type setTasksActionType = ReturnType<typeof setTasks>
export type TasksActionsType = RemoveTaskActionType | addTaskActionType | updateTaskActionType
    | addTodolistActionType | RemoveTodoListActionType | setTodolistActionType | setTasksActionType

export type TaskStateType = {
    [key: string]: TaskType[]
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,[action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], {...action.task}]}
        }
        case "UPDATE-TASK": {
            return {...state, [action.id]: state[action.id].map(t => t.id === action.taskID ? {...t, ...action.model} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}

        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.id]: action.tasks}
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string ) =>
    ({type: "REMOVE-TASK", todoListId, taskId} as const)

export const addTaskAC = (id: string, task: TaskType) => ({type: 'ADD-TASK', task, id} as const)

export const updateTask = (id: string, taskID: string, model: UpdateTaskDomainModelType) => ({
    type: "UPDATE-TASK", id, taskID, model} as const)

export const setTasks = (tasks: TaskType[], id: string) => ({type: 'SET-TASKS', tasks, id} as const)

export const fetchTasksTC = (id: string): AppThunk => async dispatch => {
    const res = await todolistAPI.getTasks(id)
    dispatch(setTasks(res.data.items,id))
}

export const removeTaskTC = (id: string, taskId: string):AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.deleteTask(id, taskId)
        dispatch(removeTaskAC(id, taskId))
    } catch (e) {
        throw new Error(e)
    }
}

export const addTaskTC = (id: string, title: string):AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.createTask(id, title)
        dispatch(addTaskAC(id, res.data.data.item))
    } catch (e) {
        throw new Error(e)
    }
}
export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (id: string, taskId: string, model: UpdateTaskDomainModelType):AppThunk =>
    async (dispatch,getState: () => AppRootStateType) => {
    try {
        const state = getState()
        const task = state.tasks[id].find(t => t.id === taskId)
        if(task) {
            const res = todolistAPI.updateTask({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            },id,taskId, )
            dispatch(updateTask(id, taskId,model))
        }
    } catch (e) {
        throw new Error(e)
    }
}
