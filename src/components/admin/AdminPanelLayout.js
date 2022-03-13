import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import companyLogo from "../../assets/icons/logo.png";
import barberPortrait from "../../assets/icons/barber-portrait.jpg";

const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;

// const FooterWrapper = styled.footer`
//   background-color: #000;
//   color: #fff;
//   flex-shrink: 0;
//   font-size: 22px;
//   padding: 10px 0;
//   z-index: 999999;
// `;

const navPages = [
  { name: "Aktualności", link: "/admin" },
  { name: "Konfiguruj system", link: "/admin/configure" },
  { name: "Rezerwacje", link: "/admin/orders" },
];

const AdminLayout = function ({ children }) {
  const [menuIsOpen, setMenuState] = useState(true);

  const onMenuOpenStateChange = (e) => {
    setMenuState(e.isOpen);
  };
  return (
    <>
      <AdminHeader
        logo={companyLogo}
        loggedUserImg={barberPortrait}
        loggedUserName="John Doe"
        name="Barber Brand Name"
      />
      <AdminSidebar
        onOpenStateChange={onMenuOpenStateChange}
        navPages={navPages}
      />
      <ContentWrapper
        style={{
          paddingTop: "100px",
          paddingRight: menuIsOpen ? "320px" : "20px",
        }}
        id="page-wrap"
      >
        {children}
      </ContentWrapper>
      {/* <FooterWrapper>Brand Name</FooterWrapper> */}
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
