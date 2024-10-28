import { knownFolders } from '@nativescript/core';
import { Message } from '../models/message.model';

export class StorageService {
    private static instance: StorageService;
    private readonly MESSAGES_FILE = 'messages.json';

    private constructor() {}

    static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    async saveMessages(messages: Message[]): Promise<void> {
        const documents = knownFolders.documents();
        const messageFile = documents.getFile(this.MESSAGES_FILE);
        await messageFile.writeText(JSON.stringify(messages));
    }

    async loadMessages(): Promise<Message[]> {
        try {
            const documents = knownFolders.documents();
            const messageFile = documents.getFile(this.MESSAGES_FILE);
            const content = await messageFile.readText();
            const messages = JSON.parse(content);
            return messages.map((m: any) => ({
                ...m,
                timestamp: new Date(m.timestamp)
            }));
        } catch {
            return [];
        }
    }
}