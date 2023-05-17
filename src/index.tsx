import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store/store';
import App from './components/app/app';
import { checkAuthStatus } from './store/user/api-actions';

store.dispatch(checkAuthStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      <App />
    </Provider>
  </StrictMode>
);
