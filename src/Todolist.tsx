import {type ChangeEvent, type KeyboardEvent, type ReactNode, useRef} from "react";
import type {FilterValuesType, Tasks} from "./Todolists.tsx";

type PropsType = {
    todolistId: string
    title: string
    tasks: Tasks
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    addTask: (payload: { todolistId: string, value: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterValuesType }) => void
    removeTodolist: (todolistId: string) => void
    changeStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    children: ReactNode
}

export const Todolist = (props: PropsType) => {

    const {title, tasks, todolistId, removeTodolist, removeTask, addTask, changeStatus, changeFilter, children} = props

    // const [value, setValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        const trimmedValue = inputRef.current?.value.trim()
        if (trimmedValue && trimmedValue !== '') {
            addTask({todolistId, value: trimmedValue})
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        } else console.log('error')
    }

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeFilter({todolistId, filter})
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const {key} = e

        if (key === 'Enter') {
            addTaskHandler()
        }
    }

    let filteredTasks = tasks[todolistId].data

    if (tasks[todolistId].filter === 'active') {
        filteredTasks = tasks[todolistId].data.filter(task => !task.isDone)
    }

    if (tasks[todolistId].filter === 'completed') {
        filteredTasks = tasks[todolistId].data.filter(task => task.isDone)
    }

    return <div>

        <h3>{title}
            <button onClick={() => removeTodolist(todolistId)}>x</button>
        </h3>

        <div>
            {/*<input value={value} onChange={onChangeInputHandler} onKeyUp={onKeyPressHandler}/>*/}
            <input ref={inputRef} onKeyUp={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                filteredTasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus({
                               todolistId,
                               taskId: t.id,
                               isDone: e.currentTarget.checked
                           })}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTask({todolistId, taskId: t.id})
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => changeFilterHandler('all')}>
                All
            </button>
            <button onClick={() => changeFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => changeFilterHandler('completed')}>
                Completed
            </button>
        </div>
        {children}
    </div>
}


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }
