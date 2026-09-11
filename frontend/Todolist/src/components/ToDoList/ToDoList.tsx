import { useFetch } from "../../hooks/useFetch"

type List = {
    id: number
    title: string
    description: string
    finished: boolean
    subTasks: SubTask[]
}

type SubTask = {
    title: string
    description: string
    finished: boolean
}

export default function ToDoList() {
    const { data: list, loading, error } = useFetch<List[]>("http://localhost:7867/tasks")

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
        <div>
            {list?.map((task: List) => (
                <div key={task.id}>
                    <h2>{task?.title}</h2>
                    <p>{task?.description}</p>
                    <p>{task?.finished ? "Finished" : "Not finished"}</p>
                    {task?.subTasks.map((subTask: SubTask) => (
                        <div key={subTask.title}>
                        <h3>{subTask?.title}</h3>
                        <p>{subTask?.description}</p>
                        <p>{subTask?.finished ? "Done" : "Not done"}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}