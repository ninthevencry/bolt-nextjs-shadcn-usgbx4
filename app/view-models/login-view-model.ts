import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../services/auth-service';

export class LoginViewModel extends Observable {
    private _username: string = '';
    private _password: string = '';
    private _errorMessage: string = '';
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange('username', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    async login() {
        try {
            const success = await this.authService.login(this._username, this._password);
            if (success) {
                Frame.topmost().navigate({
                    moduleName: 'pages/main-page',
                    clearHistory: true
                });
            } else {
                this.errorMessage = 'Invalid username or password';
            }
        } catch (error) {
            this.errorMessage = 'Login failed. Please try again.';
        }
    }
}