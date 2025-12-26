import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './store'
<<<<<<< HEAD
import { ThemeProvider } from './context/ThemeContext'
=======
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
<<<<<<< HEAD
          <ThemeProvider>
            <App />
          </ThemeProvider>
=======
          <App />
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
