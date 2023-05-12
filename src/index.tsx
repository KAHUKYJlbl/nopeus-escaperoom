import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { store } from './store/store';
import App from './components/app/app';
import { checkAuthStatus } from './store/user/api-actions';

store.dispatch(checkAuthStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      <App />
    </Provider>
  </React.StrictMode>
);
