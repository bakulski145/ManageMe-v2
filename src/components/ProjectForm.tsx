import { useState } from 'react';
import { Project } from '../types/project';

// Definiujemy kontrakt: nasz komponent wymaga przekazania mu funkcji, 
// która przyjmuje nowy projekt i nic nie zwraca (void)
interface ProjectFormProps {
    onProjectAdd: (newProject: Project) => void;
}

export const ProjectForm = ({ onProjectAdd }: ProjectFormProps) => {
    // Stany dla pojedynczych pól formularza
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    // Funkcja odpalana przy wysyłce formularza
    const handleSubmit = (e: React.FormEvent) => {
        // Zatrzymujemy domyślne zachowanie przeglądarki (czyli przeładowanie całej strony)
        e.preventDefault(); 

        if(name.trim()==='' || description.trim()==='') return;

        const newProject: Project = {
            id: Date.now(),
            name: name,
            description: description
        };

        onProjectAdd(newProject);

        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-3">Dodaj nowy projekt</h4>
            <div className="mb-3">
                <input 
                    className="form-control"
                    type="text" 
                    placeholder="Nazwa projektu" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <input 
                    className="form-control"
                    type="text" 
                    placeholder="Opis projektu" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <button className="btn btn-primary" type="submit">Dodaj Projekt</button>
        </form>
    );
};