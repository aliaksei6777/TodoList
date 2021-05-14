import {addTodolist, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const newTodolist = {id: v1(), title: "What to do", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}

    const action = addTodolist(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todoListsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})