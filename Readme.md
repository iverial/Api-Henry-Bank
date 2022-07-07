Esta es la app de HenryBank

- Endpoints :

/register : Recibe los datos del usuario a crear por body

/login : Rebibe email y password por body - Devuelve un token de valido por 24 horas

/restricted : Para peticiones que requieran tener sesion iniciada añadir Authorization como header pasando el token recibido en /login
