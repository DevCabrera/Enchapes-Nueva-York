import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './core/home/home.component'; // Asegúrate de tener un componente HomeComponent
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta para el home
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] } // Ruta para los productos
];
