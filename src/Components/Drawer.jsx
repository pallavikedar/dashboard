import React, { useEffect } from "react";
import styled from "styled-components";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 280px;
  background-color: #f8f9fa;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.1);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const H4 = styled.h4`
  padding: 5px 5px;
  font-weight: 400;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  border-radius: 8px;
  margin: 5px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2a9d8f;
    color: white;
    cursor: pointer;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

 
`;

const Drawer = ({ open, toggleDrawer }) => {
  

 

  return (
    <DrawerWrapper open={open}>
      <DrawerContent>
        <LogoWrapper>
         <h1 style={{color:"#2a9d8f"}}>Demo</h1>
          <Div>
            <GiCancel
              style={{ color: "#666", cursor: "pointer" }}
              size={30}
              onClick={toggleDrawer}
            />
          </Div>
        </LogoWrapper>

       
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/">
          <H4>Material Management</H4>
        </Link>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="Customer">
          <H4>Customer List</H4>
        </Link>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="Lead">
          <H4>Lead</H4>
        </Link>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="OfferLetter">
          <H4>Offer Letter Generate</H4>
        </Link>
        <Divider />
       
       
      </DrawerContent>
    </DrawerWrapper>
  );
};

export default Drawer;
