import { useFetch } from "../../hooks/useFetch"
import type { List, SubTask } from "./types.tsx"
import { AddTask } from "./AddTask/AddTask.tsx"
import { useState } from "react"
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx"
import listService from "../../services/listServices.tsx"
import TaskForm from "./TaskForm/TaskForm.tsx"


export default function ToDoList() {
    const { data: list, loading, error } = useFetch<List[]>("http://localhost:7867/tasks")
    const [modal, setModal] = useState(false)
    const [activeTask, setActiveTask] = useState<List | null>(null)
    const [formMode, setFormMode] = useState<"new" | "update">("new")

    //start a new Task
    const startTask = () => {
        const emptyTask = {
            id: 0,
            title: "brush teeth",
            description: "back and forth",
            subTasks: [],
            finished: false
        }
        setModal(true)
        setActiveTask(emptyTask)
        

    }
    const submitTask = async (activeTask) => {
        listService.postData()
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
        <>
        <button onClick={startTask}>Add Task</button>
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
            <ModalWrapper modal={modal} setModal={setModal}>
            <TaskForm 
            activeTask={activeTask} 
            setActiveTask={setActiveTask}
            setModal={setModal}
            formMode={formMode}
            />
            </ModalWrapper>
        )}
        </>
    )
}