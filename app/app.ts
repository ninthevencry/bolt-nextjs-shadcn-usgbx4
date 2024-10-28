import { Application } from '@nativescript/core';
import { LoginPage } from './pages/login-page';

Application.run({ create: () => new LoginPage() });