
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verifyAuthGuard } from '../guards/verify-auth.guard';
import { MainComponent } from './pages/main/main.component';
import { ServicesComponent } from './pages/services/services.component';
import { TallerDashComponent } from './pages/taller-dash/taller-dash.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { NewServiceComponent } from './pages/services/new-service/new-service.component';
import { UpdateServiceComponent } from './pages/services/update-service/update-service.component';
import { NewTallerComponent } from './pages/taller-dash/new-taller/new-taller.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'servicios', component: ServicesComponent },
      { path: 'servicios/new-service', component: NewServiceComponent},
      { path: 'servicios/update/:id', component: UpdateServiceComponent},
      { path: 'talleres', component: TallerDashComponent },
      { path: 'talleres/new', component: NewTallerComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: NewProductComponent },
      { path: 'products/update/:id', component: UpdateProductComponent }
    ],
    canActivate: [ verifyAuthGuard ]
  }
];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
