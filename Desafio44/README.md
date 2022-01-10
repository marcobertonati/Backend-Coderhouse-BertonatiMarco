# UNIQUE | Proyecto Final Backend Server Side Rendering 🛒


## RUTAS 


## ¿Cómo inicar el servidor?

## MOODO PRODUCCIÓN
Utilizamos Yargs para leer las propiedades:

--portCLI= Numero de puerto, por ejemplo 3000
--mongouriCLI= URL de Mongo, por ejemplo mongodb+srv://{USUARIO}:{CONTRASEÑA}@cluster1.gplx5.mongodb.net/{BASE DE DATOS}?retryWrites=true&w=majority
--notifyMailCLI= mail donde se van a enviar las notificaciones de correo electrónico, por ejemplo: marko.bertonati@gmail.com
--passMailCLI= contraseña del correo electrónico
--expirationSessionCLI= duración de la expresión expresado en milisegundos
--persistenceCLI= deberá ser "mongodb" o "memory"

Ejemplo de CLI bien armado: npm run prod -- --port=8060

npm run prod -- portCLI=7060 mongouriCLI==mongodb+srv://marco-bertonati:2kGJ3nrW694rYpGg@cluster1.gplx5.mongodb.net/ecommerce?retryWrites=true&w=majority notifyMailCLI=marco.n.bertonati@gmail.com passMailCLI=Irontallideth89* expirationSessionCLI=200000

npm run dev -- port_CLI=7060 mongouri_CLI==mongodb+srv://marco-bertonati:2kGJ3nrW694rYpGg@cluster1.gplx5.mongodb.net/ecommerce?retryWrites=true&w=majority notifyMail_CLI=marco.n.bertonati@gmail.com passMail_CLI=Irontallideth89* expirationSessionCLI=200000

ATENCIÓN, luego de "npm run prod" deberá consignarse dos flat "--"; es decir quedaría como el ejemplo lo indica.