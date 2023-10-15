import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./mycss.css"
import "font-awesome/css/font-awesome.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './component/store/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /></Provider>
  </React.StrictMode>
);

reportWebVitals();
