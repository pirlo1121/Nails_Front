import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormsService {

  public pass: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  public email: RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  constructor() { }

  // Función de validación personalizada para el campo 'price'
  validatePrice( control: AbstractControl ) {
    const value = control.value;

    if ( value < 0 ) {

      return { negativeValue: true };
    }

    return null;
  }

  // Función de validación personalizada para el campo 'quantity'
  validateQuantity( control: AbstractControl ) {
    const value = control.value;

    if ( value <= 0 ) {
      return { invalidQuantity: true };
    }

    return null;
  }

  // Función de validación personalizada para el campo 'description'
  validateDescription( control: AbstractControl ): { [key: string]: boolean } | null {
    const value = control.value;

    if ( value && (value.length < 3 || value.length > 1500 ) ) {
      return { invalidDescriptionLength: true };
    }

    return null;
  }

    // Función para validar una URL normal
    validateNormalUrl( control: AbstractControl ): { [key: string]: any } | null {
      const value = control.value;

      console.log( 'Valor proporcionado:', value );       // Imprime el valor en la consola

      // Verificar si el valor es un objeto de tipo File
      if ( value instanceof File ) {
        const imageType = value.type.split('/')[ 0 ];     // Obtener el tipo de imagen a partir del objeto File

        console.log( imageType );

        // Verificar si el tipo de archivo no es una imagen
        if ( imageType !== 'image' ) {
          return { invalidUrl: true };
        }
      }

      return null;    // Devolver nulo si no se encuentran errores de validación
    }
}
