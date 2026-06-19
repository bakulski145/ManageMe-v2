import { useState } from "react";
import { Task, TaskStatus} from '../types/task';

interface TaskFormProps {
    projectId: number;
    onTaskAdd: (newTask: Task) => void;
}

export const TaskForm =({ projectId, onTaskAdd}: TaskFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<TaskStatus>('todo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(title.trim()==="") return;
        const newTask: Task ={
            id: Date.now(),
            projectId: projectId,
            title: title,
            status: status,
        };
        onTaskAdd(newTask);
        setTitle('');
        setStatus('todo');
    };
    return (
        <form onSubmit={handleSubmit} className="mt-2 d-flex gap-2">
            <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Nowe zadanie..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
                <option value="todo">Do zrobienia</option>
                <option value="in-progress">W trakcie</option>
                <option value="done">Gotowe</option>
            </select>
            <button type="submit" className="btn btn-primary btn-sm">Dodaj</button>
        </form>
    );
};