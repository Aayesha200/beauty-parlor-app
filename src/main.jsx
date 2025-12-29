import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ShopProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ShopProvider>
    </React.StrictMode>,
)
