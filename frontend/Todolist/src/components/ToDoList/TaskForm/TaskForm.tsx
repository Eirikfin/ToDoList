import type { List } from "../types"
import { useState } from "react";
import listService from "../../../services/listServices";
interface FormProps {
    activeTask: List | null;
    setActiveTask: React.Dispatch<React.SetStateAction<List | null>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    formMode: string;
    }


export default function TaskForm({activeTask, setActiveTask, setModal, formMode}: FormProps) {
    
    const [error, setError] = useState("")


     const handleSubmit = async (activeTask: List) => {

        if(formMode === "new"){

            const newTask = {
                title: activeTask.title,
                description: activeTask.description,
                subTasks: activeTask.subTasks,
                finished: false
            }


        try{
        await listService.postData("http://localhost:7867/tasks", newTask)
        
        setModal(false)
        setActiveTask(null)


        
        }catch(err){
            console.log(err)
            setError("Failed to create task.")
        }
        }
    }

    if (!activeTask) return null;
    return(
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit(activeTask); }}>

        <label>Title
            <input 
            onChange={(e) => setActiveTask(prev => (prev ? { ...prev, title: e.target.value } : prev))}
            type="text"
            value={activeTask.title}
            />
        </label>
        <label>
            Description 
            <input 
            type="text" 
            onChange={(e) => setActiveTask(prev => (prev ? { ...prev, description: e.target.value } : prev))}
            value={activeTask.description}
            
            />
        </label>
        <button>Add subtask</button>
        <button type="submit">Create Task</button>

        {error && (<p>{error}</p>)}
    </form>
    )    
}