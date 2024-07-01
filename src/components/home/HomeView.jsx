import React, { useState } from "react";
import CustomInput from "../ui/input";
import { AiOutlineMail, AiFillLock, AiOutlineUser } from "react-icons/ai";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import Content from "./content";

const HomeView = () => {
  return (
    <>
      <div className="">
        <NavBar current="home"/>
          <Content/>
        <Footer/>
        
      </div>
    </>
  );
};

export default HomeView;

