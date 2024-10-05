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
   cd server
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
   Note: `INTENT_PUBLIC_KEY` and `INTENT_PRIVATE_KEY` should belong to the source domain.

## Running the Application

To run the application, you need to start both the server and the client:

1. Start the server:
   ```
   cd src
   npm start
   ```
   The server will start on `http://localhost:3002`.

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
