import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContentContextProvider } from './contextConfig.jsx'

createRoot(document.getElementById('root')).render(
  <ContentContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ContentContextProvider>,
)
