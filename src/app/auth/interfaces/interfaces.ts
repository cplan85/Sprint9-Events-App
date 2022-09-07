export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    userName?: string;
    token?: string;
    msg?: string;
    email?: string,
}

export interface User {
    uid: string;
    name: string;
    userName: string;
    password?: string;
    email?: string;
    
}