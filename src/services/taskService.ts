import { Task } from '../types/task';

const TASKS_STORAGE_KEY = 'manageme_tasks';

export const getTasks =(): Task[]=>{
    const tasksData = localStorage.getItem(TASKS_STORAGE_KEY);
    if(tasksData)
    {
        return JSON.parse(tasksData);
    }
    return [];
}

export const saveTasks =(tasks: Task[]): void =>{
    const stringifiedTasks = JSON.stringify(tasks);
    localStorage.setItem(TASKS_STORAGE_KEY, stringifiedTasks);
}