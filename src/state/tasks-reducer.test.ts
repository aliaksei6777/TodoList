import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";
import {TaskStateType} from "../App";


let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ]
    }
})

test ('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect (endState["todolistId1"].length).toBe(3)
    expect (endState["todolistId2"].length).toBe(2)
    expect (endState["todolistId2"][0].id).toBe("1")
    expect (endState["todolistId2"][1].id).toBe("3")
    // expect (endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()

})

test ('correct task should be added to correct array', () => {

    const action = addTaskAC("juce","todolistId2");
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId1"].length).toBe(3)
    expect (endState["todolistId2"].length).toBe(4)
    expect (endState["todolistId2"][0].id).toBeDefined()
    expect (endState["todolistId2"][0].title).toBe("juce")
    expect (endState["todolistId2"][0].isDone).toBe(false)

})

test ('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("todolistId2","2", false,);
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId2"][1].isDone).toBe(false)
    expect (endState["todolistId1"][1].isDone).toBe(true)
})

test ('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "Milkyway","todolistId2");
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId2"][1].title).toBe("Milkyway")
    expect (endState["todolistId1"][1].title).toBe("JS")
})

test ('new property (array) should be added with new todolist', () => {

    const action = addTodoListAC("new todolist");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error ("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test ('propperty with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
})
