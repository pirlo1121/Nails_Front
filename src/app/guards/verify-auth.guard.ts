import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const verifyAuthGuard: CanActivateFn = ( route, state ) => {

  /** Inyeccion de dependencias cuando no hay constructor, cuando tenemos una funcion */
  const authService = inject( AuthService );
  const router = inject( Router );


  /** El Guard siempre devuelve un valor Booleano */

   // true / false
  return authService.verifyToken()
    .pipe(
      tap( value => {
        if( ! value ) {
          // El Guard elija la ruta de destino cuando no tenemos acceso a las rutas premisionadas
          // router.navigate([ '/auth/login' ]);    // Forma 1
          // router.navigate([ 'auth', 'login' ]);  // Forma 2
          router.navigateByUrl( '/auth/login' );    // Forma 3
        }
      })
    );
};