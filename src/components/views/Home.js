import React from "react";
import Header from "../mainPage/Header";
import Services from "../mainPage/Services";
import About from "../mainPage/About";
import MainLayout from "../layouts/MainLayout";

const HomePageComponent = function () {
  return (
    <MainLayout>
      <Header />
      <About />
      <Services />
    </MainLayout>
  );
};
export default HomePageComponent;
