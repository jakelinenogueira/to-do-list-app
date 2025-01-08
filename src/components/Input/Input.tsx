import styles from './Input.module.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useState} from "react";

interface InputProps {
    onAddTask: (task: string) => void;
}

export default function Input({onAddTask}: InputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleAddTask = () => {
        onAddTask(inputValue);
        setInputValue("");
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleAddTask();
        }
    };

    return(
        <div className={styles.container_input}>
            <input 
                type="text"
                placeholder='Adicionar uma nova tarefa' 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAddTask}>Adicionar</button>
        </div>
    );
}