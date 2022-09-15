import { AppEvent } from './../../home/interfaces/appEvents';
export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    userName?: string;
    token?: string;
    msg?: string;
    email?: string,
    events? : AppEvent[];
    maps? : [];
}

export interface User {
    uid: string;
    name: string;
    userName: string;
    password?: string;
    email?: string;
    events? : AppEvent[];
    maps? : [];
    
}