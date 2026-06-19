import { User } from '../types/user';

const MOCK_USERS: User[] = [
    { id: 1, name: 'Jan', surname: 'Kowalski', role: 'developer' },
    { id: 2, name: 'Anna', surname: 'Nowak', role: 'devops' },
    { id: 3, name: 'Piotr', surname: 'Wiśniewski', role: 'admin' },
];

export const getUsers = (): User[] => {
return MOCK_USERS;
};

export const getLoggedInUser = (): User => {
    return MOCK_USERS[0];
};