import React from 'react';
import ReactDOM from 'react-dom/client'; // Fixed import
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import './index.css'; // Import your CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
