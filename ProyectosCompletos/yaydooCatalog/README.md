# MS Yaydoo Catalogos

### Requisitos
```
# nodejs version 18.16.0
# mongo db instalado en local
```

### Variables de Entorno
```
- HTTP_PORT: Esta variable de entorno especifica el puerto en el que se ejecutará el servidor. Si no se proporciona ningún valor, se utilizará el puerto 8080 de forma predeterminada en local, en openshift se configura el mismo por el Dockerfile
- MONGO_DB_URI: URL de conexión de base de datos de mongo de catalogos de openshift, esspecificamente a la base de datos CatalogosDb
- BASIC_AUTH_USER: Nombre de usuario para la autenticación básica
- BASIC_AUTH_PASS: Contraseña de usuario para la autenticación básica
- CATALOGS_ALLOWED: Los catalogos permitidos a consultar de la base de datos CatalogosDb, deben ir separados por comas

Valores de ejemplo se encuentran en el archivo .env.example
Se crea el archivo .env a partir del .env.example para el uso local
```

### Ejecutar entorno local
```
# install dependencies
npm install

# run in dev mode on port 8080
npm run dev
```
