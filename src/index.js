import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
// import { BrowserRouter } from "react-router-dom";
import store from './store';

ReactDOM.render( 

  //  <BrowserRouter>
    <App />
  // </BrowserRouter >

, document.getElementById('root'));
unregister();

// {/* <Provider store={ store }> */}
//  {/* </Provider> */}