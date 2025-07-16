import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import type {FilterValuesType} from "./Todolists.tsx";

type Task = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Task[]
    removeTask: (taskId: number) => void
    addTask: (value: string) => void
}

export const Todolist = (props: PropsType) => {

    const {title, tasks, removeTask, addTask} = props

    const [value, setValue] = useState<string>('')

    const [filter, setFilter] = useState<FilterValuesType>("all");


    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedValue = value?.trim()
        if (trimmedValue !== '') {
            addTask(trimmedValue)
            setValue('')
        } else return
    }


    const onKeyPressHandler = (e: KeyboardEvent) => {
        const {key} = e

        if (key === 'Enter') {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={value} onChange={onChangeInputHandler} onKeyUp={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                filteredTasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
        <div>
            <div>Many intresting information</div>
        </div>
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
