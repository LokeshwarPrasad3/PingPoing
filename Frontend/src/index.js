import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatProvider from './Context/ChatProvider';
import 'react-toastify/dist/ReactToastify.css';


// import react router dom components
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Very Imp BrowserRouter to use React-Router */}
    <BrowserRouter >
      {/* ChatProvider is Context which give Current user details */}
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);
