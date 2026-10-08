
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createRoot } from 'react-dom/client';
import App from '../demo/App.tsx';



import { MantineProvider, createTheme } from '@mantine/core';
import { ToastContainer, Zoom } from 'react-toastify';
import '../src/palmyra/template/Layout.css';
import { ThemeBlue } from '../src/blue';
import { DemoConfigProvider } from './config/DemoConfigContext';
import { configureGridPersistence } from '@palmyralabs/rt-forms-mantine';
import './theme.css';


configureGridPersistence({mode:'localStorage'})

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, Rubik, system-ui, -apple-system, Segoe UI, sans-serif',
  headings: { fontFamily: 'Inter, Rubik, system-ui, sans-serif' }
});

// const theme = createTheme({
//   components: {
//     Input: Input.extend({ classNames: classes }),
//   }
// });

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <MantineProvider>
//       <StoreFactoryContext.Provider value={storeFactory}>
//         <ThemeBlue />
//          <MantineThemeProvider>
//         <App />
//       </MantineThemeProvider>
//       </StoreFactoryContext.Provider>
//     </MantineProvider>
// )

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <ThemeBlue />
    <DemoConfigProvider>
      <App />
      <ToastContainer
        limit={3} pauseOnFocusLoss={false} autoClose={2000} position="bottom-right" hideProgressBar={false} newestOnTop
        closeOnClick rtl={false} transition={Zoom} pauseOnHover draggable
        style={{ marginTop: '2.1em', zIndex: 99999999 }}
        toastClassName="!bg-white/80 !backdrop-blur-md !text-gray-800 !rounded-2xl !shadow-xl !border !border-white/20 !overflow-hidden"
        className="text-sm! font-semibold! p-4!"
        progressClassName="!bg-linear-to-r !from-pink-500 !to-violet-500 !rounded-full"
      />
    </DemoConfigProvider>
  </MantineProvider>
)