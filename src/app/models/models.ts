export interface User {
    uid: string;
    username: string;
    email: string;
    password: string;
    perfil: 'client' | 'admin';
}
