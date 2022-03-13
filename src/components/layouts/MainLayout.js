import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Navbar from "../navbar/Navbar";

const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;

const MainLayout = function ({ children }) {
  return (
    <>
      <Navbar
        items={[
          { link: "/", name: "Home" },
          { link: "/gallery", name: "Galeria" },
          { link: "/contact", name: "Kontakt" },
          { link: "/booking", name: "Rezerwacja" },
        ]}
      />
      <ContentWrapper
        style={{
          paddingTop: "80px",
        }}
        id="page-wrap"
      >
        {children}
      </ContentWrapper>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
