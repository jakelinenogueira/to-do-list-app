
'use client';
import { useState, useEffect} from "react";
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editText, setEditText] = useState("");

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // ✅ Recupera as tarefas do Local Storage quando a página é carregada
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Atualiza o Local Storage toda vez que as tarefas mudam
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (newTask: string) => {
    if (newTask.trim() === "") return;
    const formattedTask = newTask.charAt(0).toUpperCase() + newTask.slice(1);
    const newTaskObject: Task = {
      id: Date.now(), 
      text: formattedTask ,
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

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const openEditModal = (task: Task) => {
    if (task.completed) {
      alert("Não é possível editar uma tarefa que já foi concluída.");
      return;
    }
    
    setSelectedTask(task);
    setEditText(capitalizeFirstLetter(task.text));
    setModalType("edit");
  };
  
  const openDeleteModal = (taskId: number) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      setSelectedTask(taskToDelete);
      setModalType("delete");
    }
  };

  const confirmEditTask = () => {
    if (selectedTask) {
      const formattedText = capitalizeFirstLetter(editText);
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, text: formattedText } : task
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
      <List tasks={tasks} onToggleTask={toggleTask} onEditTask={openEditModal} onDeleteTask={(id) => openDeleteModal(id)}/>

      {modalType === "edit" && (
        <Modal message="Edite sua tarefa" onConfirm={confirmEditTask} onCancel={() => setModalType(null)}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal
          message={`Tem certeza de que deseja excluir "${selectedTask?.text}"?`}
          onConfirm={confirmDeleteTask}
          onCancel={() => setModalType(null)}
        />
      )}
    </div>
  );
}
