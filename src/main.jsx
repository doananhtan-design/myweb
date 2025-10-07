import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';   // thêm dòng này
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>    {/* 👈 phải bọc App trong BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
