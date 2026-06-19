import { Project } from '../types/project';

const PROJECTS_STORAGE_KEY = 'manageme_projects';

export const getProjects = (): Project[]=>{
    const projectData = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if(projectData)
    {
        return JSON.parse(projectData)
    }
    return [];
}

export const saveProjects = (projects: Project[]): void => {
    const stringifiedProjects = JSON.stringify(projects)
    localStorage.setItem(PROJECTS_STORAGE_KEY, stringifiedProjects);
};