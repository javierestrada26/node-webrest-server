# REST Web Server — Node.js + Express + TypeScript

Servidor REST construido con Node.js, Express y TypeScript, con PostgreSQL como base de datos y Prisma como ORM. Desplegado en **Railway**.

---

## 🛠️ Stack

- **Node.js** + **TypeScript**
- **Express 5**
- **Prisma ORM** — acceso a base de datos y migraciones
- **PostgreSQL** — base de datos relacional
- **Docker / Docker Compose** — base de datos local
- **env-var** + **dotenv** — manejo de variables de entorno

---

## 📐 Arquitectura

El proyecto aplica **Clean Architecture** para el módulo de Todos y Productos.

```
src/
├── config/           → Variables de entorno validadas
├── data/             → Cliente Prisma (instancia compartida)
├── domain/           → Dominio puro: Entities, DTOs, interfaces de Repository/DataSource, Use Cases
├── infrastructure/   → Implementaciones concretas: DataSources y Repositories (Prisma)
└── presentation/     → Express: Server, Routes y Controllers
```

### Módulo Todos — Clean Architecture / DDD
Los controladores no conocen Prisma ni la base de datos. La inyección de dependencias sigue el flujo:

```
Controller → Use Case → Repository (interface) → DataSource (Prisma)
```

### Módulo Products — Acceso Directo
El controller llama directamente al cliente de Prisma. Útil para CRUDs simples sin capas intermedias.

---

## 🌐 Endpoints

| Método | Ruta                  | Descripción              |
|--------|-----------------------|--------------------------|
| GET    | `/api/todos`          | Listar todos             |
| GET    | `/api/todos/:id`      | Obtener todo por ID      |
| POST   | `/api/todos`          | Crear todo               |
| PUT    | `/api/todos/:id`      | Actualizar todo          |
| DELETE | `/api/todos/:id`      | Eliminar todo            |
| GET    | `/api/products`       | Listar productos         |
| GET    | `/api/products/:id`   | Obtener producto por ID  |
| POST   | `/api/products`       | Crear producto           |
| PUT    | `/api/products/:id`   | Actualizar producto      |
| DELETE | `/api/products/:id`   | Eliminar producto        |

---

## 🚀 Despliegue en Railway

### Variables de entorno requeridas

```env
PORT=3000
POSTGRES_URL=postgresql://user:password@host:port/database
PUBLIC_PATH=public
```

> Railway inyecta `PORT` automáticamente. Solo es obligatorio configurar `POSTGRES_URL`.

### Comandos usados por Railway

| Paso   | Comando            | Descripción                                              |
|--------|--------------------|----------------------------------------------------------|
| Build  | `npm run build`    | Limpia `dist/`, genera cliente Prisma y compila TS → JS  |
| Start  | `npm run start`    | Ejecuta el servidor compilado (`dist/app.js`)            |

### Migraciones en producción

Antes del primer despliegue (o al agregar migraciones nuevas), ejecutar:

```bash
npm run prisma:migrate:prod
```

Este comando corre `prisma migrate deploy`, aplicando las migraciones existentes a la base de datos de Railway de forma segura.

---

## 💻 Configuración Local

### Requisitos

- Node.js ≥ 18
- Docker y Docker Compose

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar y ajustar variables de entorno
cp .env.template .env

# 3. Levantar PostgreSQL en Docker (puerto 5433)
docker compose up -d

# 4. Aplicar migraciones en local
npx prisma migrate dev

# 5. Iniciar servidor con hot-reload
npm run dev
```

Servidor disponible en `http://localhost:3000`.

---

## 📝 Notas

- El servidor también sirve archivos estáticos desde la carpeta `public/` y actúa como SPA fallback (redirige rutas no encontradas a `index.html`).
- El esquema de Prisma define dos modelos: `todo` y `product`, con los clientes generados tanto en `src/generated/prisma` (desarrollo) como en `dist/generated/prisma` (producción).
