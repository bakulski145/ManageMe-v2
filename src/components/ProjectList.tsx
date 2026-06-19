import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjects, saveProjects } from '../services/projectService';
import { ProjectForm } from './ProjectForm';
import { TaskList } from './TaskList';
import { getUsers } from '../services/UserService';
import { Priority } from '../types/notification';

interface ProjectListProps {
    onNotify: (title: string, message: string, priority: Priority, recipientId: number) => void;
}

export const ProjectList = ({ onNotify }: ProjectListProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    useEffect(() => {
        const savedActiveId = localStorage.getItem('manageme_active_project');
        if (savedActiveId) {
            setActiveProjectId(Number(savedActiveId));
        }
    }, []);

    const handleProjectClick = (id: number) => {
        const newActiveId = activeProjectId === id ? null : id;
        setActiveProjectId(newActiveId);
        if (newActiveId !== null) {
            localStorage.setItem('manageme_active_project', newActiveId.toString());
        } else {
            localStorage.removeItem('manageme_active_project');
        }
    };

    const handleAddProject = (newProject: Project) => {
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        saveProjects(updatedProjects);

        const admins = getUsers().filter(user => user.role === 'admin');
        admins.forEach(admin => {
            onNotify(
                'Nowy projekt', 
                `Utworzono projekt: ${newProject.name}`, 
                'high', 
                admin.id
            );
        });
    };

    const handleDeleteProject = (projectId: number) => {
        const filteredProjects = projects.filter((project) => project.id !== projectId);
        setProjects(filteredProjects);
        saveProjects(filteredProjects);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista Projektów</h2>
            
            <div className="card mb-4 p-4 shadow-sm">
                <ProjectForm onProjectAdd={handleAddProject} />
            </div>
            
            {projects.length === 0 ? (
                <div className="alert alert-info">Brak projektów. Dodaj coś!</div>
            ) : (
                <ul className="list-group shadow-sm">
                    {projects.map((project) => (
                        <li 
                            key={project.id} 
                            className={`list-group-item ${activeProjectId === project.id ? 'active' : ''}`} 
                            onClick={() => handleProjectClick(project.id)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{project.name}</h5>
                                    <p className={`mb-0 ${activeProjectId === project.id ? 'text-light' : 'text-muted'}`}>
                                        {project.description}
                                    </p>
                                </div>
                                
                                <button 
                                    className={`btn btn-sm ${activeProjectId === project.id ? 'btn-light text-danger' : 'btn-outline-danger'}`} 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleDeleteProject(project.id);
                                    }}
                                >
                                    Usuń
                                </button>
                            </div>

                            {activeProjectId === project.id && (
                                <div className="mt-3 bg-white text-dark p-3 rounded shadow-sm" onClick={(e) => e.stopPropagation()}>
                                    <TaskList projectId={project.id} onNotify={onNotify} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};