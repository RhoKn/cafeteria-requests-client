import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/users/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { UserEditComponent } from './components/users/edit/editUser.component';
import {ProvidersComponent} from './components/providers/providers.component';
import {EditProviderComponent} from './components/providers/edit-provider/edit-provider.component';


const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'users', component: UserComponent},
    {path: 'users/edit/:id', component: UserEditComponent},
    {path:'providers',component:ProvidersComponent},
    {path:'providers/update/:id',component:EditProviderComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
