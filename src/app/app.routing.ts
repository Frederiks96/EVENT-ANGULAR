import {Routes, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ModuleWithProviders} from "@angular/core";


const APP_ROUTES: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: SignInComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
