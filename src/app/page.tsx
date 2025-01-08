
'use client';
import { useState } from "react";
import Input from "@/components/Input/Input";
import List from "@/components/List/List";
import Modal from "@/components/Modal/Modal";

export default function Page() {
  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const addTask = (newTask: string) => {
    if (newTask.trim() === "") return;
    const newTaskObject: Task = {
      id: Date.now(), 
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openDeleteModal = (id: number) => {
    setTaskToDelete(id);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
    }
    setTaskToDelete(null);
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
  };

  return (
    <div className="todo-list-container">
      <Input onAddTask={addTask} />
      <List tasks={tasks} onToggleTask={toggleTask} onDeleteTask={openDeleteModal}/>

      {taskToDelete !== null && (
        <Modal
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
        />
      )}
    </div>
  );
}
