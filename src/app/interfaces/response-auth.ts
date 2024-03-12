import { User } from "./user";

export interface ResponseAuth {
    ok: boolean;
    msg?: string;
    token?: string;
    userData?: User
}

// La respuesta del API cuando registro un usuario (BackEnd)
// {
//   "ok": true,
//   "msg": "Usuario registrado exitosamente"
// }
