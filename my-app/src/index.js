import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

