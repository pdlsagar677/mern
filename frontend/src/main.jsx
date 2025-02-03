import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';  // Your main App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { AuthProvider } from './store/auth.jsx';  // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* Wrap the entire app in BrowserRouter */}
      <AuthProvider>  {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
