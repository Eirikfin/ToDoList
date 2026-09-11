import { useState } from "react"

interface ModalProps {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddTask({ modal, setModal }: ModalProps){

    const openModal = () => {
        
        if(modal == true){
            setModal(false)
        }

        return setModal(true)
    }


    return (
        <button onClick={openModal}>Add Task</button>
    )
}