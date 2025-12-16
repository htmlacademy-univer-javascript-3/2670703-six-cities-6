import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const OFFERS_COUNT = 312;

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT} />
  </React.StrictMode>
);
