import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type Todolist = {
    id: string
    title: string
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Tasks = {
    [key: string]: {
        data: Task[]
        filter: FilterValuesType
    }
}

export const Todolists = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<Tasks>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });


    const removeTask = (payload: { todolistId: string, taskId: string }) => {

        const {todolistId, taskId} = payload
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId], data: tasks[todolistId].data.filter(task => task.id !== taskId)
            }
        });
    }

    const addTask = (payload: { todolistId: string, value: string }) => {

        const {todolistId, value} = payload
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: [{id: v1(), title: value, isDone: false}, ...tasks[todolistId].data]
            }
        });
    }

    function changeFilter(payload: { todolistId: string, filter: FilterValuesType }) {
        const {todolistId, filter} = payload
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter}})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }

    const changeStatus = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {

        const {todolistId, taskId, isDone} = payload
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(task => task.id === taskId ? {...task, isDone} : task)
            }
        });
    }


    return (
        <div className="App">
            {
                todolists.map(todo => {

                    return (
                        <Todolist key={todo.id}
                                  title="filtering with switch case"
                                  todolistId={todo.id}
                                  removeTodolist={removeTodolist}
                                  tasks={tasks}
                                  changeStatus={changeStatus}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeFilter={changeFilter}>
                            <div>
                                <div style={{color: 'lightpink'}}>Many interesting information</div>
                            </div>
                        </Todolist>
                    )
                })
            }

        </div>
    );
}
