import { EventData, Page, NavigatedData } from '@nativescript/core';
import { MainViewModel } from '../view-models/main-view-model';

export class MainPage extends Page {
    private viewModel: MainViewModel;

    constructor() {
        super();
        this.viewModel = new MainViewModel();
    }

    onNavigatingTo(args: NavigatedData) {
        super.onNavigatingTo(args);
        const page = <Page>args.object;
        page.bindingContext = this.viewModel;
    }
}