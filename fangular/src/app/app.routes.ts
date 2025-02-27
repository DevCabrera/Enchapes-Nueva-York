import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './guards/role-guard.service';
import { AdministrationComponent } from './admin/administration/administration.component';
import { ProductAdministrationComponent } from './admin/product-administration/product-administration.component.spec';
import { LoginComponent } from './login/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'administration', component: AdministrationComponent, canActivate: [RoleGuard], data: { requiredRole: 1 } },
    { path: 'admin/products', component: ProductAdministrationComponent, canActivate: [AuthGuard, RoleGuard], data: { requiredRole: 1 } },
    { path: 'login', component: LoginComponent },

];
