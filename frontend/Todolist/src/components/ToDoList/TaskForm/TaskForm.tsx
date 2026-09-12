import type { List } from "../types"
import { useState } from "react";
interface FormProps {
    activeTask: List;
    setActiveTask: React.Dispatch<React.SetStateAction<List>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    formMode: string;
    }


export default function TaskForm({activeTask, setActiveTask, setModal, formMode}: FormProps) {
    
    


    return(
    <form>

        <label>Title
            <input 
            onChange={(e) => setActiveTask(prev => ({ ...prev, title: e.target.value }))} 
            type="text"
            value={activeTask.title}
            />
        </label>
        <label>
            Description 
            <input 
            type="text" 
            onChange={(e) => setActiveTask(prev => ({ ...prev, description: e.target.value }))}
            value={activeTask.description}
            
            />
        </label>
        <button>Add subtask</button>
        <button>Create Task</button>
    </form>
    )    
}