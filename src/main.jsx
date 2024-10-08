import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SortContextProvider } from './contextAPI/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SortContextProvider>
      <App />
    </SortContextProvider>
  </StrictMode>,
)
