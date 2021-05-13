import {addTodolist, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer, TaskStateType} from "./tasks-reducer";

// test('ids should be equals', () => {
//     const startTasksState: TaskStateType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     const action = addTodolist("new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action);
//     const endTodolistsState = todoListsReducer(startTodolistsState,action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].todoListId;
//
//     expect(idFromTasks).toBe(action.todoListId)
//     expect(idFromTodolists).toBe(action.todoListId)
// })