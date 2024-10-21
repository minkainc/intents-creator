# Creador de Intents

Esta es una aplicación web para crear intents, con opciones para usar o no usar el SDK. La aplicación consta de un frontend en React y un backend en Node.js.

## Prerrequisitos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos:

* Has instalado Node.js (se recomienda la versión 14.x o posterior)

## Configuración del Proyecto

Para configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/intents-creator.git
   cd intents-creator
   ```

2. Configura el servidor:
   ```
   cd src
   npm install
   ```

3. Configura el cliente:
   ```
   cd ../client
   npm install
   ```

4. Crea un archivo `.env` en el directorio del servidor con el siguiente contenido:
   ```
   LEDGER_SERVER=[servidor]
   LEDGER_HANDLE=[nombre del ledger]
   INTENT_PUBLIC_KEY=[clave pública para firmar el intent]
   INTENT_PRIVATE_KEY=[clave privada para firmar el intent]
   ```
   Nota: `INTENT_PUBLIC_KEY` e `INTENT_PRIVATE_KEY` deben pertenecer al dominio de origen.

## Ejecutando la Aplicación

Para ejecutar la aplicación, necesitas iniciar tanto el servidor como el cliente:

1. Inicia el servidor:
   ```
   cd src
   npm start
   ```
   El servidor se iniciará en `http://localhost:3002`.

2. En una nueva terminal, inicia el cliente:
   ```
   cd client
   npm start
   ```
   El cliente se iniciará en `http://localhost:3000`.

3. Abre tu navegador web y visita `http://localhost:3000` para usar la aplicación.

## Uso de la Aplicación

1. Completa el formulario con los detalles requeridos del intent.
2. Elige si quieres usar el SDK o no marcando/desmarcando la casilla "Usar SDK".
3. Haz clic en "Crear Intent" para enviar el formulario.
4. El intent creado se registrará en la consola del servidor.

## Solución de Problemas

Si encuentras algún problema:

1. Asegúrate de que todas las dependencias estén instaladas correctamente.
2. Verifica que el archivo `.env` esté configurado correctamente en el directorio del servidor.
3. Asegúrate de que tanto el cliente como el servidor estén en ejecución.
4. Revisa los registros de la consola tanto en el navegador como en la terminal del servidor para ver si hay mensajes de error.

## Contribuciones

Las contribuciones al proyecto Creador de Intents son bienvenidas.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
