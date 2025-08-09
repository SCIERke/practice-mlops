

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { loadConfig } from '../src/services/config';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

loadConfig().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
