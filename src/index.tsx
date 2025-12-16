import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const OFFERS_COUNT = 312;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App offersCount={OFFERS_COUNT} />
    </BrowserRouter>
  </React.StrictMode>
);
