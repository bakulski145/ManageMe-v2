import { useEffect, useState } from "react";
import { Task } from '../types/task';
import { getTasks, saveTasks} from "../services/taskService";
import { TaskForm } from "./TaskForm";

interface TaskListProps {
    projectId: number;
}

export const TaskList = ({ projectId }: TaskListProps) =>{
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        setTasks(getTasks());
    }, []);

    const handleAddTask = (newTask: Task) =>{
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleDeleteTask = (id: number) =>{
        const filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks);
        saveTasks(filteredTasks);
    }

    const filteredTasks = tasks.filter((task) => task.projectId === projectId);

    return (
        <div className="mt-3">
            <h6>Zadania:</h6>
            <TaskForm projectId={projectId} onTaskAdd={handleAddTask} />
            {filteredTasks.length === 0 ? (
                <p className="text-muted small">Brak zadań w tym projekcie.</p>
            ) : (
                <ul className="list-group list-group-flush">
                    {filteredTasks.map(task => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center bg-light">
                            <div>
                                <span className="small fw-bold me-2">{task.title}</span>
                                <span className="badge bg-secondary">{task.status}</span>
                            </div>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Usuń</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
