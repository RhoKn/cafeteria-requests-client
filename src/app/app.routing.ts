import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/users/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { UserEditComponent } from './components/users/edit/editUser.component';
import {ProvidersComponent} from './components/providers/providers.component';
import {EditProviderComponent} from './components/providers/edit-provider/edit-provider.component';
import { UnitComponent} from './components/unit/unit.component';

//Token
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService} from './services/token-interceptor.service';
import { AuthGuard } from './guards/auth-guard.service';
import {RestService} from './rest.service';

const appRoutes: Routes = [
  //  {path: '', component: LoginComponent},
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'users', component: UserComponent,canActivate:[AuthGuard]},
    {path: 'users/edit/:id', component: UserEditComponent,canActivate:[AuthGuard]},
    {path:'providers',component:ProvidersComponent,canActivate:[AuthGuard]},
    {path:'providers/update/:id',component:EditProviderComponent,canActivate:[AuthGuard]},
    {path:'units',component:UnitComponent,canActivate:[AuthGuard]},
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [    RestService, AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
