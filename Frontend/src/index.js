import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatProvider from './Context/ChatProvider';


// import react router dom components
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ChatProvider is Context which give Current user details */}
    <ChatProvider>
      {/* add BrowserRouter to use React-Router */}
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </ChatProvider>
  </React.StrictMode>
);
