export type Role = 'admin' | 'devops' | 'developer';

export interface User{
    id: number;
    name: string;
    surname: string;
    role: Role;
}
