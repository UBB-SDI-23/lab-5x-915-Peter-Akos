import React from 'react';
import './Layout.css'
import { Outlet } from "react-router-dom";
import ResponsiveNavigationBar from '../components/layout/responsiveNavigationBar'

const Layout = () => {
  return (
    <>
      <ResponsiveNavigationBar />

      <Outlet />
    </>
  )
};

export default Layout;