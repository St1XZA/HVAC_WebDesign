import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';
import { readPage } from './lib/routes';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/landing.css';

injectSpeedInsights();

const { page, slug } = readPage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App page={page} slug={slug} />
  </StrictMode>,
);
