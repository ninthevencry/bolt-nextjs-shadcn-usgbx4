import { Observable, Frame } from '@nativescript/core';
import { Message } from '../models/message.model';
import { AuthService } from '../services/auth-service';
import { StorageService } from '../services/storage-service';

export class MainViewModel extends Observable {
    private _messages: Message[] = [];
    private _currentMessage: string = '';
    private authService: AuthService;
    private storageService: StorageService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.storageService = StorageService.getInstance();
        this.loadMessages();
    }

    async loadMessages() {
        this._messages = await this.storageService.loadMessages();
        this.notifyPropertyChange('messages', this._messages);
    }

    get messages(): Message[] {
        return this._messages;
    }

    get currentMessage(): string {
        return this._currentMessage;
    }

    set currentMessage(value: string) {
        if (this._currentMessage !== value) {
            this._currentMessage = value;
            this.notifyPropertyChange('currentMessage', value);
        }
    }

    get username(): string {
        return this.authService.currentUser?.username || 'Unknown';
    }

    async sendMessage() {
        if (this._currentMessage.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: this._currentMessage,
                sender: this.username,
                timestamp: new Date()
            };

            this._messages.push(newMessage);
            await this.storageService.saveMessages(this._messages);
            this.notifyPropertyChange('messages', this._messages);
            this.currentMessage = '';
        }
    }

    logout() {
        this.authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login-page',
            clearHistory: true
        });
    }
}