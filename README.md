#  Eventia - Sistema de Gestión de Tickets

Este proyecto permite gestionar tickets y usuarios para soporte técnico, incluyendo trazabilidad.

---

##  Estructura del Proyecto

- **Frontend**: Angular 18 Standalone + Material UI
- **Backend**: .NET 9 API REST con Clean Architecture
- **Base de Datos**: SQL Server
- **Autenticación**: Simulada mediante localStorage

---

##  Requisitos Previos

- .NET 9 SDK
- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- SQL Server
- Visual Studio o VSCode

---

## ▶ Cómo correr el backend

1. Ir a la carpeta del backend

2. Verifica la cadena de conexión en `appsettings.json`:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=EventiaDb;Trusted_Connection=True;TrustServerCertificate=True"
   }
   ```

3. Ejecutar migraciones y levantar la base:

   ```bash
   dotnet ef database update
   ```

4. Iniciar el proyecto:

   ```bash
   dotnet run
   ```

 Backend expone la API en:\
`http://localhost:5059`

---

##  Cómo correr el frontend

1. Ir a la carpeta del frontend

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar el proyecto:

   ```bash
   ng serve
   ```

 Frontend estará disponible en:\
`http://localhost:4200`

---

##  Usuario de prueba

Puedes iniciar sesión con cualquier correo **existente** en la base de datos.\
**Ejemplo** (insertado por defecto):

 El login simulado solo requiere escribir el correo. No hay contraseña.

```json
{
  "id": "90917090-37A2-470D-B36D-A474915FCB48",
  "nombre": "Administrador Demo",
  "correo": "admin@eventia.com",
  "rol": 1,
  "activo": true
}
```

---

##  Endpoints Backend disponibles

###  Usuarios

| Método | Endpoint                        | Descripción                |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/api/usuarios`                 | Obtener todos los usuarios |
| GET    | `/api/usuarios/{id}`            | Obtener usuario por ID     |
| GET    | `/api/usuarios/BuscarPorCorreo` | Buscar usuario por correo  |
| POST   | `/api/usuarios`                 | Crear nuevo usuario        |
| PUT    | `/api/usuarios/{id}`            | Editar usuario             |
| PATCH  | `/api/usuarios/{id}/disable`    | Deshabilitar usuario       |
| PATCH  | `/api/usuarios/{id}/enable`     | Habilitar usuario          |
| PATCH  | `/api/usuarios/{id}/rol`        | Asignar rol a usuario      |

###  Tickets

| Método | Endpoint            | Descripción                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/tickets`      | Obtener todos los tickets     |
| GET    | `/api/tickets/{id}` | Obtener ticket por ID         |
| POST   | `/api/tickets`      | Crear nuevo ticket            |
| PUT    | `/api/tickets/{id}` | Editar ticket                 |
| DELETE | `/api/tickets/{id}` | Eliminar ticket (soft delete) |

###  Trazabilidad

| Método | Endpoint                        | Descripción                       |
| ------ | ------------------------------- | --------------------------------- |
| GET    | `/api/trazabilidad/ticket/{id}` | Obtener trazabilidad de un ticket |

---

##  Roles del sistema

```ts
export enum Rol {
  Administrador = 1,
  Agente = 2,
  Supervisor = 3
}
```

- Los **Agentes** no pueden ver ni acceder a la gestión de usuarios.

---

##  Estados de los tickets

```ts
export enum EstadoTicket {
  Abierto = 0,
  EnProceso = 1,
  Cerrado = 2
}
```

