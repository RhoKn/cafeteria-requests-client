import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './components/users/user.component';
import { UserEditComponent } from './components/users/edit/editUser.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { RegisterComponent } from './components/register/register.component';
import { ProvidersComponent} from './components/providers/providers.component';
import { routing, appRoutingProviders } from './app.routing';
import { EditProviderComponent } from './components/providers/edit-provider/edit-provider.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitEditComponent } from './components/unit/edit-unit/editUnit.component';
import { DRoomsComponent } from './components/dRooms/dRooms.component';
import { DRoomEditComponent } from './components/dRooms/dRooms-edit/editDRooms.component';
import { RequestComponent } from './components/request/request.component';
import { RequestEditComponent } from './components/request/edit/editRequest.component';
import { RequestViewComponent } from './components/request/viewList/viewRequest.component';
import { PTypeComponent } from './components/productType/productType.component';
import { PTypeEditComponent } from './components/productType/edit-unit/editPType.component';
import { ProductComponent } from './components/products/product.component';
import { EditProductComponent } from './components/products/edit/editProduct.component';

//Token
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService} from './services/token-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import {RestService} from './rest.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    UserEditComponent,
    ProvidersComponent,
    EditProviderComponent,
    UnitComponent,
    UnitEditComponent,
    DRoomsComponent,
    DRoomEditComponent,
    RequestComponent,
    RequestEditComponent,
    PTypeComponent,
    PTypeEditComponent,
    ProductComponent,
    EditProductComponent,
    RequestViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
