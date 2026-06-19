import { AppNotification, Priority } from '../types/notification';

const NOTIFICATION_STORAGE_KEY = 'manageme_notification';

export const getNotification = (): AppNotification[] => {
    const notification_data = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if(notification_data) {
        return JSON.parse(notification_data);
    }
    return []; // Zaczynamy z pustą listą, bez mocków!
}

export const saveNotification = (notifications: AppNotification[]): void => {
    const stringifiedNotifications = JSON.stringify(notifications);
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, stringifiedNotifications);
}

export const addNotification = (
    title: string, 
    message: string, 
    priority: Priority, 
    recipientId: number
): AppNotification => {
    const notifications = getNotification();
    
    const newNotification: AppNotification = {
        id: Date.now(),
        title: title,
        message: message,
        date: new Date().toISOString(),
        priority: priority,
        isRead: false,
        recipientId: recipientId
    };

    const updatedNotifications = [newNotification, ...notifications];
    saveNotification(updatedNotifications);
    
    return newNotification;
}