import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from './JS/store';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

