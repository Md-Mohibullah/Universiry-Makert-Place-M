import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword"
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import RequestListing from "./pages/RequestListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditFeaturedListing from "./pages/EditFeaturedListing";
import EditRequestedLisitng from "./pages/EditRequestedLisitng";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact/:ownerId" element={<Contact />} />
        <Route path="/forgot-password" element={< ForgotPassword />} />
        <Route path="/create-listing" element={< CreateListing />} />
        <Route path="/request-listing" element={< RequestListing />} />
        <Route path="/EditFeaturedListing/:listingId" element={< EditFeaturedListing />} />
        <Route path="/EditRequestedLisitng/:listingId" element={< EditRequestedLisitng />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/category/:categoryName/:listingId" element={<Listing />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
