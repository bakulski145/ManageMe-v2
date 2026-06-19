import { AppNotification } from '../types/notification';

interface NotificationListProps {
    notifications: AppNotification[];
    onMarkAsRead: (id: number) => void;
}

export const NotificationList = ({notifications, onMarkAsRead} : NotificationListProps) => {
    if(notifications.length===0)
    {
        return <div className="alert alert-info mt-4">Brak powiadomień.</div>;
    }
    return (
        <div className="mt-4">
            <h2 className="mb-4">Twoje powiadomienia</h2>
            <div className="list-group shadow-sm">
                {notifications.map(notification => (
                    <div 
                        key={notification.id} 
                        // Zmieniamy kolor tła w zależności od tego, czy przeczytane
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${notification.isRead ? 'bg-light text-muted' : ''}`}
                    >
                        <div>
                            <h5 className="mb-1">{notification.title}</h5>
                            <p className="mb-1">{notification.message}</p>
                        </div>
                        {!notification.isRead && (
                            <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => onMarkAsRead(notification.id)}
                            >
                                Odznacz jako przeczytane
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

