type Task = {
    taskId: number
    title: string
    isDone: boolean
}

export type DataType = {
    title: string
    tasks: Task[]
    students: string[]
}


type PropsType = {
    data: DataType
}


export const ExtraPractice1 = (props: PropsType) => {

    return (
        <div>
            <h1>{props.data.title}</h1>
            <ul>
                {props.data.tasks.map(task => <li>
                    <span>{task.title}</span>
                    <input type='checkbox' checked={task.isDone}/>
                </li>)}
            </ul>
            <ul>
                {props.data.students.map(student => <li>{student}</li>)}
            </ul>

        </div>
    )
}
