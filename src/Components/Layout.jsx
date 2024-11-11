

import Header from "./Header";
import { Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import LeadDashboard from './Lead';
import Material from "./Material";
import OfferLetterForm from "./OfferLetterForm";
import CustomerManagement from "./CustomerManagement";
import TextPad from './Letterpad';
import Dashboard from "./Dashboard";



function Layout() {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  return (
    <div className="App">
      <Header toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <Routes>
     
        <Route
          path="Lead"
          element={
            <LeadDashboard isDrawerOpen={isDrawerOpen}  />
          }
        />
        <Route
          path="/"
          element={
            <Material isDrawerOpen={isDrawerOpen} />
          }
        />
        <Route
        path="Customer"
        element={
          <CustomerManagement isDrawerOpen={isDrawerOpen} />
        }
      />
      <Route
      path="OfferLetter"
      element={
        <OfferLetterForm isDrawerOpen={isDrawerOpen} />
      }
    />
    <Route
    path="Letterpad"
    element={
      <TextPad isDrawerOpen={isDrawerOpen} />
    }
  />
   
      </Routes>
    </div>
  );
}

export default Layout;
