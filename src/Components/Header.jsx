import React from 'react';
import { IoMenu } from "react-icons/io5";

import styled from 'styled-components';
import Drawer from './Drawer';


const Wrapper = styled.header`
  height: 70px;
  width: 100%;
  
  background-color:#2a9d8f;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;

const Name = styled.h3`
  color: white;
  padding: 5px;
  font-weight: 400;
`;

function Header({ isDrawerOpen,toggleDrawer }) {
 

  return (
    <>
      <Wrapper>
        <IoMenu size={45} style={{ paddingLeft: "30px" }} onClick={toggleDrawer} />
        
        
      </Wrapper>
      <Drawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Pass the drawer state to Home */}
    </>
  );
}

export default Header;
