import React from 'react';
import style from './List.module.scss';
import Image from 'next/image';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface ListProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (task: Task) => void;
}

export default function List({tasks, onToggleTask, onDeleteTask, onEditTask }: ListProps) {
    return(
        <ul className={style.container_list}>
            {tasks.map((task) => (
                <li key={task.id} className={task.completed ? style.completed : ""}>
                    <div className={style.container_display}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                        />
                        {task.text}
                    </div>
                    <div className={style.container_display}>
                        <button onClick={() => onEditTask(task)}>
                            <Image src="/assets/icons/edit.png" alt="Lápis" width={22} height={22} />
                        </button>
                        <button onClick={() => onDeleteTask(task.id)}>
                            <Image src="/assets/icons/delete.png" alt="Lixeira" width={18} height={18} />
                        </button>
                    </div>
                </li>
            ))}
            <div className={style.footer}>
                <p>Created by <a href="https://www.linkedin.com/in/jakeline-nogueira-04b2a314b/" target="_blank" rel="noopener noreferrer">Jakeline Nogueira</a></p>
            </div>
        </ul>
    );
}