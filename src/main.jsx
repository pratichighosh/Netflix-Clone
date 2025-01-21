import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Your main App component
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root'); // Get the root DOM element
const root = createRoot(container); // Create a root

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
