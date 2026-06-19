export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: number;
    projectId: number;
    title: string;
    status: TaskStatus;
    assigneeId?: number;
}