import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import './styles/global.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <HeadProvider>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HeadProvider>
  </React.StrictMode>
);
