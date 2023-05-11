import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
// import { Provider } from 'react-redux';

// store.dispatch(checkAuthStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} /> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
);
