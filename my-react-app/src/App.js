import React from "react";
import "./App.css";
import Home from "./amazon/home";
import Grocery from "./amazon/grocery";
import Mobiles from "./amazon/mobiles";
import Fashion from "./amazon/fashion";
import ItemDetails from "./amazon/itemDetails";
import Cart from "./amazon/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./amazon/checkout";
import Nav from "./amazon/nav";
import Footer from "./amazon/footer";
import SuccessPage from "./amazon/successPage";
import SignIn from "./amazon/signin";
import SignUp from "./amazon/signup";

const App = () => {
  return (
    <BrowserRouter>
      <div data-testid="App" className="app-wrapper">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="mobiles" element={<Mobiles />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="itemDetails" element={<ItemDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="successPage" element={<SuccessPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
