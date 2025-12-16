import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Router'; // Renaming the imported Router for clarity
import './index.css';

import { AuthProvider } from '../src/hooks/authContent'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* The AuthProvider must wrap the entire router setup */}
    <AuthProvider>
      {/* FIX 3: Use <BrowserRouter> as imported from react-router-dom.
        If your './routes/Router' file uses createBrowserRouter, 
        you should remove the <BrowserRouter> wrapper.
        
        Assuming you use standard V6 setup with <BrowserRouter>:
      */}
      <BrowserRouter> 
        {/* You should render your main route component here */}
        <AppRoutes /> 
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);