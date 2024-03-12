import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { NewServiceComponent } from './pages/services/new-service/new-service.component';
import { UpdateServiceComponent } from './pages/services/update-service/update-service.component';
import { TallerDashComponent } from './pages/taller-dash/taller-dash.component';
import { NewTallerComponent } from './pages/taller-dash/new-taller/new-taller.component';




@NgModule({
  declarations: [
    MainComponent,
    ServicesComponent,
    ProductsComponent,
    UpdateProductComponent,
    NewProductComponent,
    NewServiceComponent,
    UpdateServiceComponent,
    NewTallerComponent,
    TallerDashComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
