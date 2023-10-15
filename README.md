#### Pasos de ejecución y variables de entorno

El proyecto consta de 3 microservicios, gateway, front-end app & orders

Se necesitarán las siguientes variables en un .env file en el siguiente lugar:

/orders/.env ->

MONGO_URI = "mongodb+srv://johanrincondev:<password>@johancluster.e3lbz6l.mongodb.net/Orders?retryWrites=true&w=majority"
PORT = 3001
BASE_URL="/api/v1"

Esto para hacer la conexión de la mongoDB
No olvidar reemplazar <password> con la contraseña real de la bdd

### docker-compose build & docker-compose up
