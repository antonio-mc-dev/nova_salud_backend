# Backend Botica Nova Salud

API RESTful para el sistema de ventas de la botica "Nova Salud".

## Requisitos

- Node.js v18 o superior
- MySQL v8 o superior

## Tecnologías

- Node.js (ES Modules)
- Express 5
- Prisma ORM 6
- MySQL
- JWT, bcryptjs

## Instalación y Configuración

1. Instalar las dependencias:
   ```bash
   npm install
   ```

2. Configurar las variables de entorno en un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=4000
   DATABASE_URL="mysql://usuario:password@localhost:3306/nova_salud"
   JWT_SECRET="tu_super_secreto_aqui"
   ```

3. Asegurarse de que la base de datos `nova_salud` exista y tenga las tablas creadas de acuerdo a `prisma/schema.prisma`. Puedes utilizar `npx prisma db pull` y `npx prisma generate` si la base de datos ya está estructurada, o `npx prisma db push` para crear las tablas desde el schema.

4. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Endpoints de la API

La API cuenta con los siguientes endpoints organizados por módulos. Todos los endpoints excepto el inicio de sesión y registro requieren autenticación a través del Header `Authorization: Bearer <token>`.

### Base
- `GET /` : Retorna mensaje de bienvenida de la API.

### Autenticación
- `POST /auth/login` : Inicia sesión y retorna un token JWT.
- `POST /auth/register` : Registra un nuevo empleado.

### Laboratorio
- `GET /laboratorios` : Lista todos los laboratorios.
- `POST /laboratorios` : Crea un laboratorio.
- `PUT /laboratorios/:id` : Actualiza un laboratorio.
- `PATCH /laboratorios/:id` : Cambia el estado (activo) de un laboratorio.
- `DELETE /laboratorios/:id` : Elimina un laboratorio.

### Categoría
- `GET /categorias` : Lista todas las categorías.
- `POST /categorias` : Crea una categoría.
- `PUT /categorias/:id` : Actualiza una categoría.
- `DELETE /categorias/:id` : Elimina una categoría.

### Presentación
- `GET /presentaciones` : Lista todas las presentaciones.
- `POST /presentaciones` : Crea una presentación.
- `PUT /presentaciones/:id` : Actualiza una presentación.
- `DELETE /presentaciones/:id` : Elimina una presentación.

### Unidad de Venta
- `GET /unidades-venta` : Lista todas las unidades de venta.
- `POST /unidades-venta` : Crea una unidad de venta.
- `PUT /unidades-venta/:id` : Actualiza una unidad de venta.
- `DELETE /unidades-venta/:id` : Elimina una unidad de venta.

### Cargo
- `GET /cargos` : Lista todos los cargos.
- `POST /cargos` : Crea un cargo.
- `PUT /cargos/:id` : Actualiza un cargo.
- `DELETE /cargos/:id` : Elimina un cargo.

### Cliente
- `GET /clientes` : Lista todos los clientes.
- `GET /clientes/:dni` : Busca un cliente por su DNI o RUC.
- `POST /clientes` : Crea un cliente.
- `PUT /clientes/:id` : Actualiza un cliente.
- `DELETE /clientes/:id` : Elimina un cliente.

### Medicamento
- `GET /medicamentos` : Lista los medicamentos y sus precios.
- `POST /medicamentos` : Crea un medicamento.

### Empleado
- `GET /empleados` : Lista los empleados registrados.

### Venta
- `GET /ventas` : Lista los comprobantes (ventas) generados.
- `GET /ventas/:id` : Devuelve el detalle completo de una venta.
- `POST /ventas` : Crea una venta completa realizando el cálculo y validando stock en una transacción.

#### Ejemplo de body para `POST /ventas`
```json
{
  "tipo_comprobante_id": 1,
  "cliente_id": 1,
  "items": [
    {
      "medicamento_precio_id": 1,
      "cantidad": 2,
      "precio_unitario": 1.50
    },
    {
      "medicamento_precio_id": 4,
      "cantidad": 1,
      "precio_unitario": 3.50
    }
  ]
}
```

#### Ejemplo de respuesta para `POST /ventas`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "serie": "B001",
    "numero": 1,
    "tipo_comprobante_id": 1,
    "cliente_id": 1,
    "empleado_id": 1,
    "fecha": "2024-01-15T10:30:00.000Z",
    "igv": "1.08",
    "total": "6.50",
    "tipo_comprobante": { "nombre": "Boleta" },
    "cliente": { "nombre": "Juan", "apellido": "Pérez", "dni": "12345678" },
    "empleado": { "nombre": "Carlos", "apellido": "Quispe Ramos" },
    "detalle_venta": [
      {
        "id": 1,
        "comprobante_id": 1,
        "medicamento_precio_id": 1,
        "cantidad": 2,
        "precio_unitario": "1.50",
        "subtotal": "3.00",
        "medicamento_precio": {
          "medicamento": { "nombre": "Amoxicilina 500mg" },
          "unidad_venta": { "nombre": "Unidad" }
        }
      }
    ]
  }
}
```
