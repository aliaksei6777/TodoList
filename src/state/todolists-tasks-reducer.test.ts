import {addTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodoListType} from "../App";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todoListsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})