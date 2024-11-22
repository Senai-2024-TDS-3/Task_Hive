import { useEffect, useState } from "react"

export default function Hex_Cell_Task(){

    const [tasks, setTasks] = useState([])

    const MaxLeft = 7

    useEffect(() => {
        const fetchtask = async() => {
            const response  = await fetch('/visualizar_all_tasks');
            const data = await response.json();
            setTasks(data);
        };

        fetchtask();

        const leftTasks = tasks.slice(0, maxLeft); 
        const rightTasks = tasks.slice(maxLeft);

    })
    return(
        <>
        <div className="hex_wrapper">
            <div className="hex_teste">
                
            </div>
        </div>
        </>
    )
}