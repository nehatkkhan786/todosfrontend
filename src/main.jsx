import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainAppContextProvider } from './ContextAndReducer/MainContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer
      position='top-center'
      autoClose={3000}
      theme="light"
      />
    <MainAppContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </MainAppContextProvider>
  </React.StrictMode>,
)
