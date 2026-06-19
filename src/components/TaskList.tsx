import { useEffect, useState } from "react";
import { Task } from '../types/task';
import { getTasks, saveTasks } from "../services/taskService";
import { TaskForm } from "./TaskForm";
import { User } from '../types/user';
import { getUsers, getLoggedInUser } from "../services/UserService";
import { Priority } from '../types/notification';

interface TaskListProps {
    projectId: number;
    // DODANO ODBIÓR KABLA:
    onNotify: (title: string, message: string, priority: Priority, recipientId: number) => void;
}

export const TaskList = ({ projectId, onNotify }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const currentUser = getLoggedInUser();

    useEffect(() => {
        setTasks(getTasks());
        setUsers(getUsers());
    }, []);

    const handleAddTask = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        // --- WYZWALACZE POWIADOMIEŃ ---
        // 1. Priorytet MEDIUM: Nowe zadanie
        onNotify(
            'Nowe zadanie', 
            `Dodano zadanie: "${newTask.title}"`, 
            'medium', 
            currentUser.id
        );

        // 2. Priorytet HIGH: Przypisanie pracownika (jeśli ktoś został wybrany)
        if (newTask.assigneeId) {
            onNotify(
                'Przypisanie do zadania', 
                `Zostałeś przypisany do: "${newTask.title}"`, 
                'high', 
                newTask.assigneeId
            );
        }
        
        // 3. Priorytet LOW: Jeśli dodano od razu ze statusem in-progress
        if (newTask.status === 'in-progress') {
            onNotify('Status zadania', `Zadanie w trakcie: "${newTask.title}"`, 'low', currentUser.id);
        } else if (newTask.status === 'done') {
            onNotify('Status zadania', `Zadanie gotowe: "${newTask.title}"`, 'medium', currentUser.id);
        }
    };

    const handleDeleteTask = (id: number) => {
        const taskToDelete = tasks.find(t => t.id === id);
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
        saveTasks(filteredTasks);

        // --- WYZWALACZ POWIADOMIENIA ---
        // Priorytet MEDIUM: Usunięcie zadania
        if (taskToDelete) {
            onNotify(
                'Usunięto zadanie', 
                `Zadanie "${taskToDelete.title}" zostało skasowane.`, 
                'medium', 
                currentUser.id
            );
        }
    };

    const getAssigneeName = (assigneeId?: number) => {
        if (!assigneeId) return 'Brak przypisania';
        const user = users.find((u) => u.id === assigneeId);
        return user ? `${user.name || user.name} ${user.surname || user.surname}` : 'Nieznany';
    };

    const filteredTasks = tasks.filter((task) => task.projectId === projectId);

    return (
        <div className="mt-3">
            <h6>Zadania:</h6>
            <TaskForm projectId={projectId} onTaskAdd={handleAddTask} />
            {filteredTasks.length === 0 ? (
                <p className="text-muted small mt-2">Brak zadań w tym projekcie.</p>
            ) : (
                <ul className="list-group list-group-flush mt-2 border rounded">
                    {filteredTasks.map(task => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center bg-light">
                            <div>
                                <span className="small fw-bold me-2">{task.title}</span>
                                <span className="badge bg-secondary me-2">{task.status}</span>
                                <span className="small text-muted">
                                    <i className="bi bi-person me-1"></i>
                                    {getAssigneeName(task.assigneeId)}
                                </span>
                            </div>
                            <button 
                                className="btn btn-outline-danger btn-sm" 
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Usuń
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};