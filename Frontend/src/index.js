import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// import react router dom components
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* add BrowserRouter to use React-Router */}
    <BrowserRouter >
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
