import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  /** Rutas de los componentes del Modulo Auth */
  {
    path: '',                     // /auth
    component: MainComponent,     // MainComponent
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    
      /** Ruta para la redireccion de rutas desconocidas del Modulo Auth */
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
