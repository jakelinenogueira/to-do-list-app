
'use client';
import React from 'react';
import { useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import styles from './Tasks.module.scss'
import Input from "@/components/Input/Input";
import List from "@/components/List/List";
import Modal from "@/components/Modal/Modal";
import Filters from "@/components/Filters/Filters"; 
import Header from '@/components/Header/Header';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Tasks() {
  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editText, setEditText] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null); 

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email); 
      } else {
        router.push('/login'); 
      }
    });

    return () => unsubscribe();
  }, [router]);

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

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed" && !task.completed) return false;
    if (filterStatus === "incomplete" && task.completed) return false;
    if (searchText && !task.text.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };


  return (
    <div className={styles.tasks}>
      <div className="container">
        <div className="row flex-md-row flex-column-reverse">
                <div className="col-md-6">
                    <div className={styles.main_content}>
                        <Header/>
                        <div className={styles.container_filters}>
                            <Input onAddTask={addTask} />

                            <Filters
                                filterStatus={filterStatus}
                                setFilterStatus={setFilterStatus}
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                        </div>

                        {filteredTasks.length === 0 ? (
                        <p className={styles.no_tasks_message}>Nenhuma tarefa encontrada.</p>
                        ) : (
                        <List tasks={filteredTasks} onToggleTask={toggleTask} onEditTask={openEditModal} onDeleteTask={openDeleteModal} />
                        )}

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
                </div>
                <div className="col-md-6">
                    <div className={styles.image_content}>
                      <div className={styles.user_area}>
                        <p>Bem-vindo(a), <strong>{userName}</strong>!</p>
                        <button onClick={logout}>Sair</button>
                      </div>
                      <img className="img-fluid" src="/assets/images/list.jpg" alt="cenário"/>
                      <p className={styles.copyright}>Created by <a href="https://www.linkedin.com/in/jakeline-nogueira-04b2a314b/" target="_blank">Jakeline Nogueira</a></p>
                    </div>
                </div>
        </div>
      </div>
    </div>
  );
}