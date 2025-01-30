import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './store/auth.jsx'; // Make sure the import path is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap App with AuthProvider to provide context */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
