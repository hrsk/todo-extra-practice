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

    function removeTask(id: number) {
        const filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const addTask = (value: string) => {
        setTasks([{id: Math.random(), title: value, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}/>
        </div>
    );
}
