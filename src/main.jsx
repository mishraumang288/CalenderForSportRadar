import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ContextWrapper from './context/ContextWrapper.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ContextWrapper>
    <BrowserRouter>
      <App />
     

    </BrowserRouter>
  </ContextWrapper>
  </StrictMode>,
)
