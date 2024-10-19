import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../demo/App.tsx'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import classes from './index.module.css';

import '../src/palmyra/template/Layout.css'
import { StoreFactoryContext } from '@palmyralabs/rt-forms'
import storeFactory from './components/Wire/StoreFactory.ts'
import { ThemeBlue } from '../src/blue.ts'
import { createTheme, Input, MantineProvider } from '@mantine/core'


const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <StoreFactoryContext.Provider value={storeFactory}>
        <ThemeBlue />
        <App />
      </StoreFactoryContext.Provider>
    </MantineProvider>
  </React.StrictMode>,
)