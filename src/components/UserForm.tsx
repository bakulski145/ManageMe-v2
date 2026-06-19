import { useState }from 'react';
import { User, Role} from '../types/user';

interface UserFormProps {
    onUserAdd: (newUser: User) => void;
}

export const UserForm = ({ onUserAdd }: UserFormProps) => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [role, setRole] = useState<Role>('developer');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim()!=='' && surname.trim()!=='')
        {
            const newUser: User ={
                id: Date.now(),
                name: name,
                surname: surname,
                role: role,
            }
            onUserAdd(newUser);
            setName("");
            setSurname("");
            setRole('developer')

        }
    };
    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
            <h5 className="mb-3">Dodaj członka zespołu</h5>
            <div className="row g-2">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Imię" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nazwisko" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                    />
                </div>
                <div className="col-md-3">
                    <select 
                        className="form-select" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value as Role)}
                    >
                        <option value="developer">Developer</option>
                        <option value="devops">DevOps</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="col-md-1">
                    <button type="submit" className="btn btn-success w-100">Dodaj</button>
                </div>
            </div>
        </form>
    );
};