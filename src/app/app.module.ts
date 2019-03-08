import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { UserComponent } from './components/users/user.component';
import { UserEditComponent } from './components/users/edit/editUser.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { RegisterComponent } from './components/register/register.component';
import { ProvidersComponent} from './components/providers/providers.component';
import { routing, appRoutingProviders } from './app.routing';
import { EditProviderComponent } from './components/providers/edit-provider/edit-provider.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    UserEditComponent,
    ProvidersComponent,
    EditProviderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
