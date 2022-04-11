import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
const Layout = ({ children, title, description, isFluid }) => {
  if(isFluid === false){
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <Header />
         <Container>{children}</Container> 
        <Footer />
      </>
    );
  }else{
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <Header />
         <Container fluid>{children}</Container> 
        <Footer />
      </>
    );
  }
 
};

export default Layout;
