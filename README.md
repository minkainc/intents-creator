# Intents Creator

This is a web application for creating intents, with options to use or not use the SDK. The application consists of a React frontend and a Node.js backend.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (version 14.x or later recommended)


## Setting Up the Project

To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/intents-creator.git
   cd intents-creator
   ```

2. Set up the server:
   ```
   npm install -g typescript ts-node   
   cd src
   npm install
   ```

3. Set up the client:
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following content:
   ```
   LEDGER_SERVER=[server]
   LEDGER_HANDLE=[ledger name]
   INTENT_PUBLIC_KEY=[public key to sign the intent]
   INTENT_PRIVATE_KEY=[private key to sign the intent]
   ```
   Note: 
   `INTENT_PUBLIC_KEY` and `INTENT_PRIVATE_KEY` should belong to the source domain.
   `CLIENT_ID` and `CLIENT_SECRET` are the credentials of the client that will be used to authenticate requests to the server.
## Running the Application

To run the application, you need to start both the server and the client:

1. Start the server:
   ```
   cd src
   npm start
   ```
   
   The server will start on `http://localhost:3002`.

If you want to avoid having to restart the service after each change, you can install a tool like nodemon that will monitor your project for changes and automatically restart the service.

To install nodemon, run:

```bash
npm install -g nodemon
```
Then you should run the application using:

```bash
nodemon server.ts
```

2. In a new terminal, start the client:
   ```
   cd client
   npm start
   ```
   The client will start on `http://localhost:3000`.

3. Open your web browser and visit `http://localhost:3000` to use the application.

## Using the Application

1. Fill in the form with the required intent details.
2. Choose whether to use the SDK or not by checking/unchecking the "Use SDK" checkbox.
3. Click "Create Intent" to submit the form.
4. The created intent will be logged in the server console.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that the `.env` file is set up correctly in the server directory.
3. Make sure both the client and server are running.
4. Check the console logs in both the browser and the server terminal for any error messages.

## Contributing

Contributions to the Intents Creator project are welcome. 

## Container Development

This project is containerized to facilitate development. To use it:

1. Make sure you have Docker installed and the "Dev Containers" extension in Visual Studio Code or Cursor IDE.

2. When opening the project in VS Code or Cursor, press `Cmd+P` (Mac) or `Ctrl+P` (Windows/Linux) and run:
   ```
   >Dev Containers: Rebuild Container
   ```
   This will build the container with all necessary dependencies.

3. Once inside the container, you can use the predefined IDE tasks to run the project:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Select "Tasks: Run Task"
   - Choose:
     - `start-dev-server` to start the server, this will start the server on port 9000
     - `start-client` to start the client, this will start the client on port 3000

These tasks will make it easier to run the project without having to remember specific commands. This workflow works in both Visual Studio Code and Cursor IDE.

# Testing
To test the API, you can use the `test-create-intent.http` file located in the `src` folder and use the endpoint `POST http://localhost:9000/api/create-intent-sdk`

Rest Client is a VS Code extension that allows you to test REST APIs.


## License

[MIT](https://choosealicense.com/licenses/mit/)
