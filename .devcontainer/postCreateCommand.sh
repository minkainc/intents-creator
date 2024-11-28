npm install -g typescript ts-node nodemon

cd src
npm ci

cd ../client
npm ci
npm install react-router-dom @types/react-router-dom

cd ..