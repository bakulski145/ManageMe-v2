import { useState, useEffect } from 'react'; 
import { ProjectList } from "./components/ProjectList";
import { getLoggedInUser } from "./services/UserService";
import { AppNotification, Priority } from './types/notification';
import { getNotification, saveNotification, addNotification } from './services/NotificationService';
import { NotificationList } from './components/NotificationList';

type Theme = 'light' | 'dark';
type View = 'projects' | 'notifications'

function App()
{
  const currentUser = getLoggedInUser();
  const [theme, setTheme] = useState<Theme>('light');
  const [currentView, setCurrentView] = useState<View>('projects');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('manageme_theme') as Theme;
    if(savedTheme){
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
    setNotifications(getNotification());
  }, []);
  const markAsRead = (id: number) => {
    const updateNotifications = notifications.map(notification => {
      if(notification.id === id)
      {
        return {...notification, isRead: true};
      }
      return notification;
    })
    setNotifications(updateNotifications);
    saveNotification(updateNotifications);
  }
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('manageme_theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  const filteredNotifications = notifications.filter((notification) => notification.isRead === false)
  const unreadCount = filteredNotifications.length;

return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h1 style={{ cursor: 'pointer' }} onClick={() => setCurrentView('projects')}>Moja Aplikacja - ManageMe</h1>
                <div className="text-end d-flex align-items-center gap-3">
                  <button 
                        className="btn btn-outline-secondary position-relative"
                        onClick={() => setCurrentView('notifications')}
                    >
                        🔔 Powiadomienia
                        {unreadCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    {/* PRZYCISK ZMIANY MOTYWU */}
                    <button 
                        className={`btn btn-sm ${theme === 'light' ? 'btn-dark' : 'btn-light'}`} 
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? '🌙 Ciemny' : '☀️ Jasny'}
                    </button>

                    <div className="text-end">
                        <span className="text-muted small d-block">Zalogowany jako:</span>
                        <strong>{currentUser?.name} {currentUser?.surname}</strong> 
                        <span className="badge bg-info ms-2">{currentUser?.role}</span>
                    </div>
                </div>
            </div>
            
            {currentView === 'projects' ? (
    <ProjectList />
) : (
    <NotificationList 
        notifications={notifications} 
        onMarkAsRead={markAsRead} 
    />
)}
        </div>
    );
}

export default App;