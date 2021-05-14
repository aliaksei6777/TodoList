import {v1} from 'uuid';
import {
    addTodolist, changeTodoListFilterAC, changeTodoListTitle, FilterValuesType, removeTodoList, TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoList(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const newTodolist = {id: v1(), title: "What to do", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}


        const endState = todoListsReducer(startState, addTodolist(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to do");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todoListsReducer(startState, changeTodoListTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = {
        type: "CHANGE-TODOLIST-FILTER" as const,
        id: todolistId2,
        filter: newFilter
    };
    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
