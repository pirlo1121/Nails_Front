import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { TalleresComponent } from './pages/talleres/talleres.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { StoreComponent } from './pages/store/store.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { BannerTiendaComponent } from './components/banner-tienda/banner-tienda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoHomeComponent } from './components/info-home/info-home.component';
import { AsideComponent } from './components/aside/aside.component';
import { TallerComponent } from './components/taller/taller.component';
import { CardTallerComponent } from './components/card-taller/card-taller.component';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './auth/pages/main/main.component';
import { CardServicesComponent } from './components/card-services/card-services.component';
import { ServicesComponent } from './pages/services/services.component';
import { BannerServiciosComponent } from './components/banner-servicios/banner-servicios.component';
import { CarComponent } from './components/car/car.component';
import { HeaderDashboardComponent } from './components/header-dashboard/header-dashboard.component';
import { BannerInfoServiciosComponent } from './components/banner-info-servicios/banner-info-servicios.component';

@NgModule({
  declarations: [
    //pages
    AppComponent,
    AgendaComponent,
    StoreComponent,
    HomeComponent,
    // componenets
    HeaderComponent,
    HeaderDashboardComponent,
    FooterComponent,
    CardsComponent,
    BannerTiendaComponent,
    InfoHomeComponent,
    AsideComponent,
    TallerComponent,
    CardTallerComponent,
    CardServicesComponent,
    ServicesComponent,
    CarComponent,
    TalleresComponent,
    BannerServiciosComponent,
    BannerInfoServiciosComponent,
    TalleresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
