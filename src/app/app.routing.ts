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
import { UnitEditComponent } from './components/unit/edit-unit/editUnit.component';
import { DRoomsComponent } from './components/dRooms/dRooms.component';
import { DRoomEditComponent } from './components/dRooms/dRooms-edit/editDRooms.component';
import { RequestComponent } from './components/request/request.component';
import { RequestEditComponent } from './components/request/edit/editRequest.component';
import { PTypeComponent } from './components/productType/productType.component';
import { PTypeEditComponent } from './components/productType/edit-unit/editPType.component';
import { ProductComponent } from './components/products/product.component';
import { EditProductComponent } from './components/products/edit/editProduct.component';
import { BussesComponent } from './components/busses/busses.component';
import { BussesEditComponent } from './components/busses/busses-edit/editBusses.component';


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
    {path:'units/update/:id',component:UnitEditComponent,canActivate:[AuthGuard]},
    {path:'dinningRooms',component:DRoomsComponent,canActivate:[AuthGuard]},
    {path:'dinningRooms/update/:id',component:DRoomEditComponent,canActivate:[AuthGuard]},
    {path:'requests',component:RequestComponent,canActivate:[AuthGuard]},
    {path:'requests/update/:id',component:RequestEditComponent,canActivate:[AuthGuard]},
    {path:'productTypes',component:PTypeComponent,canActivate:[AuthGuard]},
    {path:'productTypes/update/:id',component:PTypeEditComponent,canActivate:[AuthGuard]},
    {path:'products',component:ProductComponent,canActivate:[AuthGuard]},
    {path:'products/update/:id',component:EditProductComponent,canActivate:[AuthGuard]},
    {path:'busses',component:BussesComponent,canActivate:[AuthGuard]},
    {path:'busses/update/:id',component:BussesEditComponent,canActivate:[AuthGuard]},
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [    RestService, AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
