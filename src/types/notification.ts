export type Priority = 'low' | 'medium' | 'high';

export interface AppNotification {
    id: number;
    title: string;
    message: string;
    date: string;
    priority: Priority;
    isRead: boolean;
    recipientId: number;
}