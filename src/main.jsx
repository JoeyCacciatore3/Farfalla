import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initAnalytics } from './utils/analytics'
import './index.css'

const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'

// Initialize privacy-first analytics
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
