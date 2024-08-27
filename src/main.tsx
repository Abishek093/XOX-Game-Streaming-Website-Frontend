import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';
import { LoadingProvider } from './context/LoadingContext';
import { SocketProvider } from './context/socketContext';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <SocketProvider>
    <LoadingProvider>
      <Toaster position="top-center" richColors />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </LoadingProvider>
    </SocketProvider>
  </React.StrictMode>
);
