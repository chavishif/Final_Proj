import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Contact from './features/components/general/Contact';
import ProductDetails from './features/components/products/ProductDetails';
import Cart from './features/components/cart/Cart';
import Wishlist from './features/components/wishlist/Wishlist';
import Products from './features/components/products/Products';
import LandingPage from './features/components/auth/pages/LandingPage';
import LoginPage from './features/components/auth/pages/LoginPage';
import RegisterPage from './features/components/auth/pages/RegisterPage';
import About from './features/components/general/About';
import   HomePage  from './features/components/general/HomePage';
import Shipping from './features/components/checkout/Shipping';
import ShippingFooter from './features/components/general/ShippingFooter';
import PayPal from './features/components/checkout/Paypal';
import Profile from './features/Profile/Profile';
import MyOrder from './features/Profile/MyOrder';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="category" element={<Products />}>
              <Route path=":name" element={<Products />} />
            </Route>
            <Route path="product" element={<ProductDetails />} >
              <Route path=":id" element={<ProductDetails />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/auth" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/shippingdel" element={<ShippingFooter />}/>
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/paypal" element={<PayPal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorder/:id" element={<MyOrder />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

