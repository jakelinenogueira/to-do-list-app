
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
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editText, setEditText] = useState("");

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

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setEditText(task.text);
    setModalType("edit");
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setModalType("delete");
  };

  const confirmEditTask = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, text: editText } : task
        )
      );
      setModalType(null);
      setSelectedTask(null);
    }
  };

  const confirmDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      setModalType(null);
      setSelectedTask(null);
    }
  };

  return (
    <div className="todo-list-container">
      <Input onAddTask={addTask} />
      <List tasks={tasks} onToggleTask={toggleTask} onEditTask={openEditModal} onDeleteTask={openDeleteModal}/>

      {modalType === "edit" && (
        <Modal message="Edit your task" onConfirm={confirmEditTask} onCancel={() => setModalType(null)}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal
          message={`Are you sure you want to delete "${selectedTask?.text}"?`}
          onConfirm={confirmDeleteTask}
          onCancel={() => setModalType(null)}
        />
      )}
    </div>
  );
}
