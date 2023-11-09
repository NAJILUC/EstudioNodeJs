# MS Yaydoo Contratos

### Requisitos
```
# nodejs version 18.16.0
# mongo db instalado en local
```

### Variables de Entorno
```
-   HTTP_PORT: Esta variable de entorno especifica el puerto en el que se ejecutará el servidor. Si no se proporciona ningún valor, se utilizará el puerto 8080 de forma predeterminada en local, en openshift se configura el mismo por el Dockerfile
-   MONGO_DB_URI: URL de conexión de base de datos de mongo/cosmos pasarela de pagos para la base entities y collection contracts

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
