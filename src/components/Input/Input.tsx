import styles from './Input.module.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useState} from "react";

interface InputProps {
    onAddTask: (task: string) => void;
}

export default function Input({onAddTask}: InputProps) {
    const[task, setTask] = useState("");

    const handleAddTask = () => {
        onAddTask(task);
        setTask("");
    }
    return(
        <div className={styles.container_input}>
            <input 
                type="text"
                placeholder='Add a new task' 
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add task</button>
        </div>
    );
}