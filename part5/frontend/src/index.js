import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles';

import App from './App'

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <CssVarsProvider>
    <App />
  </CssVarsProvider>
)