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
   npm install -g typescript ts-node
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
   El servidor se iniciará en `http://localhost:3001`.

Si deseas evitar tener que reiniciar el servicio después de cada cambio, puedes instalar una herramienta como nodemon que monitoreará tu proyecto en busca de cambios y reiniciará automáticamente el servicio.

Para instalar nodemon, ejecuta:

```bash
npm install -g nodemon
```

Luego deberás ejecutar la aplicación usando:

```bash
nodemon server.ts
```

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

## Desarrollo con Contenedores

Este proyecto está contenerizado para facilitar el desarrollo. Para utilizarlo:

1. Asegúrate de tener instalado Docker y la extensión "Dev Containers" en Visual Studio Code o Cursor IDE.

2. Al abrir el proyecto en VS Code o Cursor, presiona `Cmd+P` (Mac) o `Ctrl+P` (Windows/Linux) y ejecuta:
   ```
   >Dev Containers: Rebuild Container
   ```
   Esto montará el contenedor con todas las dependencias necesarias.

3. Una vez dentro del contenedor, puedes utilizar las tasks predefinidas del IDE para ejecutar el proyecto:
   - Presiona `Cmd+Shift+P` (Mac) o `Ctrl+Shift+P` (Windows/Linux)
   - Selecciona "Tasks: Run Task"
   - Elige:
     - `start-dev-server` para iniciar el servidor, esto iniciará el servidor en el puerto 9000
     - `start-client` para iniciar el cliente, esto iniciará el cliente en el puerto 3000

Estas tasks facilitarán la ejecución del proyecto sin necesidad de recordar los comandos específicos. Este flujo de trabajo funciona tanto en Visual Studio Code como en Cursor IDE.

# Pruebas
Para probar la API puedes usar el archivo `test-create-intent.http` que se encuentra en la carpeta `src` y usar el endpoint `POST http://localhost:9000/api/create-intent-sdk`

Rest Client es una extensión de VS Code que permite probar APIs REST.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
