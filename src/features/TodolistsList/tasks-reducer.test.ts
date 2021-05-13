import {
    addTask,
    removeTask,
    tasksReducer,
    TaskStateType
} from "./tasks-reducer";
import {addTodolist, removeTodoList} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";


let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", status: TaskStatuses.Completed,todoListId: 'todolistId1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed,todoListId: 'todolistId1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "ReactJS", status: TaskStatuses.New,todoListId: 'todolistId1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
        ],
        "todolistId2": [
            {id: "1", title: "Milk", status: TaskStatuses.Completed,todoListId: 'todolistId2', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "Bread", status: TaskStatuses.Completed,todoListId: 'todolistId2', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "Salt", status: TaskStatuses.New,todoListId: 'todolistId2', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low},
        ]
    }
})

test ('correct task should be deleted from correct array', () => {

    const action = removeTask("todolistId2","2" );

    const endState = tasksReducer(startState, action)

    expect (endState["todolistId1"].length).toBe(3)
    expect (endState["todolistId2"].length).toBe(2)
    expect (endState["todolistId2"][0].id).toBe("1")
    expect (endState["todolistId2"][1].id).toBe("3")

})

test ('correct task should be added to correct array', () => {

    let newTask:TaskType = {id: "5", title: "juce", status: TaskStatuses.New,todoListId: 'todolistId2', addedDate: "",
        deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low}
    const action = addTask("todolistId2",newTask);
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId1"].length).toBe(3)
    expect (endState["todolistId2"].length).toBe(4)
    expect (endState["todolistId2"][3].id).toBeDefined()
    expect (endState["todolistId2"][3].title).toBe("juce")
    expect (endState["todolistId2"][3].status).toBe(TaskStatuses.New)

})

// test ('status of specified task should be changed', () => {
//
//     const action = changeTaskStatus("todolistId2","2", TaskStatuses.New,);
//     const endState = tasksReducer(startState, action)
//
//     expect (endState["todolistId2"][1].status).toBe(TaskStatuses.New)
//     expect (endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
// })

// test ('title of specified task should be changed', () => {
//
//     const action = changeTaskTitle("todolistId2", "2","Milkyway");
//     const endState = tasksReducer(startState, action)
//
//     expect (endState["todolistId2"][1].title).toBe("Milkyway")
//     expect (endState["todolistId1"][1].title).toBe("JS")
// })

// test ('new property (array) should be added with new todolist', () => {
//
//     const action = addTodolist("new todolist");
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error ("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// })

test ('property with todolistId should be deleted', () => {

    const action = removeTodoList("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
})
