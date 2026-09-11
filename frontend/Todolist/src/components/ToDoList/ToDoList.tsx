import { useFetch } from "../../hooks/useFetch"
import type { List, SubTask } from "./types.tsx"
import { AddTask } from "./AddTask/AddTask.tsx"
import { useState } from "react"


export default function ToDoList() {
    const { data: list, loading, error } = useFetch<List[]>("http://localhost:7867/tasks")
    const [modal, setModal] = useState(false)



    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
        <>
        <AddTask modal={modal} setModal={setModal}/>
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


        {modal && (
            <h2>This is the open modal</h2>
        )}
        </>
    )
}