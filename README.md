# ⚙️ Punto Meeple - Backend
Backend del proyecto Punto Meeple, desarrollado con NestJS y TypeScript.

Proporciona una API REST para la gestión de:

- Usuarios (miembros)
- Cuotas
- Biblioteca (futuro)
- Eventos (futuro)

## 🧱 Tecnologías utilizadas
- NestJS
- TypeScript
- PostgreSQL
- Docker

## 📋 Requisitos
### Sin Docker
- Node.js (>= 18)
- npm o yarn
- PostgreSQL
### Con Docker (recomendado)
- Docker
- Docker Compose

## 📥 Instalación
Este proyecto está pensado para ser ejecutado junto con el repositorio: https://github.com/sergiova97/punto-meeple-docker.git

1. Seguir las instrucciones de instalación de dicho repo
2. Entrar al contenedor `backend`
```bash
docker compose exec backend bash
```
3. Instalar dependencias
```bash
npm install
```
4. Ejecutar la aplicación
```bash
npm run start:dev
```
API disponible en `http://localhost:3000`

## 📡 Endpoints principales
### 👤 Usuarios
- `POST /users` → Crear usuario
- `GET /users` → Listar usuarios
- `GET /users/:id` → Obtener usuario

### 💰 Cuotas

## 🧠 Notas
- Arquitectura basada en módulos
- Separación clara entre controladores y servicios
- Preparado para integración con base de datos mediante ORM