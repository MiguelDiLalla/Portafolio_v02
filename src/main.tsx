import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UIProvider } from './contexts/UIContext';
import { RingsProvider } from './contexts/RingsContext';

createRoot(document.getElementById('root')!).render(
  <UIProvider>
    <RingsProvider>
      <App />
    </RingsProvider>
  </UIProvider>
);
