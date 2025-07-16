import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = "all" | "active" | "completed";

export const Todolists = () => {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: number) {
        const filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const addTask = (value: string) => {
        setTasks([{id: Math.random(), title: value, isDone: false}, ...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const getFilteredTasksIfElse = (filter: FilterValuesType) => {
        let filteredTasks = tasks;

        if (filter === "active") {
            filteredTasks = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            filteredTasks = tasks.filter(t => t.isDone);
        }
        return filteredTasks
    }

    const getFilteredTasksSwitchCase = (filter: FilterValuesType) => {
        switch (filter) {
            case "all":
                return tasks
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <Todolist title="filtering with switch case"
                      tasks={getFilteredTasksSwitchCase(filter)}
                      removeTask={removeTask}
                      addTask={addTask} changeFilter={changeFilter}>
                <div>
                    <div style={{color: 'lightpink'}}>Many interesting information</div>
                </div>
            </Todolist>
            <Todolist title={'filtering with if else 2'} tasks={getFilteredTasksIfElse(filter)} removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}>
                <div>
                     this is children component
                </div>
            </Todolist>
        </div>
    );
}
