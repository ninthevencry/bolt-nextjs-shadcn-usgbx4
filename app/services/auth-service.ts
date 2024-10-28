import { Observable } from '@nativescript/core';

export interface User {
    id: string;
    username: string;
}

export class AuthService extends Observable {
    private static instance: AuthService;
    private _currentUser: User | null = null;
    private _users: Map<string, string> = new Map(); // username -> password

    private constructor() {
        super();
        // Demo users
        this._users.set('demo', 'password123');
        this._users.set('test', 'password123');
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(username: string, password: string): Promise<boolean> {
        const storedPassword = this._users.get(username);
        if (storedPassword && storedPassword === password) {
            this._currentUser = {
                id: Date.now().toString(),
                username
            };
            return true;
        }
        return false;
    }

    logout(): void {
        this._currentUser = null;
    }

    get currentUser(): User | null {
        return this._currentUser;
    }
}