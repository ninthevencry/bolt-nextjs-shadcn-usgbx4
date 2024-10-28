import { EventData, Page, NavigatedData } from '@nativescript/core';
import { LoginViewModel } from '../view-models/login-view-model';

export class LoginPage extends Page {
    private viewModel: LoginViewModel;

    constructor() {
        super();
        this.viewModel = new LoginViewModel();
    }

    onNavigatingTo(args: NavigatedData) {
        super.onNavigatingTo(args);
        const page = <Page>args.object;
        page.bindingContext = this.viewModel;
    }
}