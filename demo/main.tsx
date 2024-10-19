import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../demo/App.tsx'
import './index.css'
import '../src/palmyra/template/Layout.css'
import { StoreFactoryContext } from '@palmyralabs/rt-forms'
import storeFactory from './components/Wire/StoreFactory.ts'
import { ThemeBlue } from '../src/blue.ts'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <StoreFactoryContext.Provider value={storeFactory}>
        <ThemeBlue />
        <App />
      </StoreFactoryContext.Provider>
    </MantineProvider>
  </React.StrictMode>,
)