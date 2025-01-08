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
}

export default function List({tasks, onToggleTask, onDeleteTask }: ListProps) {
    return(
        <ul className={style.container_list}>
            {tasks.map((task) => (
                <li key={task.id} className={task.completed ? style.completed : ""}>
                    {task.text}
                    <div>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                        />
                        <button onClick={() => onDeleteTask(task.id)}>
                            <Image src="/assets/icons/delete.png" alt="Lixeira" width={20} height={20} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}