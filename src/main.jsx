import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import App from './App';
import './index.css';
import { questConfig } from './config/questConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <App />
    </QuestProvider>
  </React.StrictMode>
);