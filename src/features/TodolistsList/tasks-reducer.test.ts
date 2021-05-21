import {
    addTask,
    removeTask, setTasks,
    tasksReducer,
    TaskStateType, updateTask
} from "./tasks-reducer";
import {addTodolist, removeTodoList, setTodolists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";
import {v1} from "uuid";


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

    let newTask:TaskType = {id: "4", title: "juce", status: TaskStatuses.New,todoListId: 'todolistId2', addedDate: "",
        deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low}
    const action = addTask(newTask);
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId1"].length).toBe(3)
    expect (endState["todolistId2"].length).toBe(4)
    expect (endState["todolistId2"][3].id).toBeDefined()
    expect (endState["todolistId2"][3].title).toBe("juce")
    expect (endState["todolistId2"][3].status).toBe(TaskStatuses.New)

})

test ('status of specified task should be changed', () => {

    const action = updateTask("todolistId2","2", {status: TaskStatuses.New});
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId2"][1].status).toBe(TaskStatuses.New)
    expect (endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
})

test ('title of specified task should be changed', () => {

    const action = updateTask("todolistId2", "2", {title: "Milkyway"});
    const endState = tasksReducer(startState, action)

    expect (endState["todolistId2"][1].title).toBe("Milkyway")
    expect (endState["todolistId1"][1].title).toBe("JS")
})

test ('new property (array) should be added with new todolist', () => {

    const newTodolist = {id: v1(), title: "What to do", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}

    const action = addTodolist(newTodolist);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error ("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test ('property with todolistId should be deleted', () => {

    const action = removeTodoList("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolists([
        {id: "1", title: "title 1", order: 0, addedDate: ""},
        {id: "2", title: "title 2", order: 0, addedDate: ""}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
    const action = setTasks(startState["todolistId1"], "todolistId1");

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})
