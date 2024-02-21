import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//imports
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from "./theme";

//redux imports
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./state";


// you can make multiple reducers if you want to.  cart is our only reducer, so to access the "isCartOpen" state for ex, use state.cart.isCartOpen
const store = configureStore({
  reducer: { cart: cartReducer },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

