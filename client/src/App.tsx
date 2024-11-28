import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './styles/navigation.css';
import './styles/intent.css';
import Navigation from './components/Navigation';
import AppRoutes from './routes/index';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;