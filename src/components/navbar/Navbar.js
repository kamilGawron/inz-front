import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Collapse from "@kunukn/react-collapse";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarListItems from "./ListItemsComponent";
import companyLogo from "../../assets/icons/logo.png";
import { logoutUser } from "../../services/api/user";
import { logoutUser as logoutUserFromStore } from "../../redux/user";
import Login from "../userService/LoginComponent";
import Modal from "../modal/Modal";

const NavbarWrapper = styled.div`
  background-color: #000;
  color: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 15px 10px;
  z-index: 1000;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.div`
  font-size: 18px;
  margin-left: 10px;
`;

const UpperBelt = styled.div`
  display: flex;
  align-items: Center;
  &.desktop {
    .logo-wrapper {
      flex: 1;
    }
    .options-wrapper {
      flex: 3;
    }
  }

  &.mobile {
    .logo-wrapper {
      flex: 2;
      justify-content: flex-start;
    }
    .hamburger-wrapper {
      flex: 1;
      text-align: right;
      .hamburger-icon {
        cursor: pointer;
        font-size: 26px;
      }
    }
  }
`;

const LogoImageWrapper = styled.img`
  height: 50px;
  margin: 0;
`;

const MainNavbarComponent = function ({ items }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentWidth, setCurrentWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [mobileMenuBreakpoint] = useState(480);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [mobileMenuVisibleState, setMobileMenuVisibleState] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setCurrentWidth(window.innerWidth);
      });
    }
  }, []);

  function onHamburgerClick() {
    const mobileMenuPreviousState = mobileMenuVisibleState;
    setMobileMenuVisibleState(!mobileMenuPreviousState);
  }
  const onLogoutClick = async () => {
    await logoutUser(function () {
      navigate("/", { replace: true });
    });
    dispatch(logoutUserFromStore());
  };

  const onUserIconClick = () => {
    setLoginModalOpen(true);
  };

  return (
    <NavbarWrapper>
      <UpperBelt
        className={mobileMenuBreakpoint <= currentWidth ? "desktop " : "mobile"}
      >
        <LogoWrapper className="logo-wrapper">
          <LogoImageWrapper src={companyLogo} />
          <BrandName>Brand Name</BrandName>
        </LogoWrapper>
        {mobileMenuBreakpoint <= currentWidth && (
          <div className="options-wrapper">
            <NavbarListItems items={items} display="desktop" />
          </div>
        )}
        {mobileMenuBreakpoint > currentWidth && (
          <div
            tabIndex={0}
            role="button"
            className="hamburger-wrapper"
            onClick={onHamburgerClick}
          >
            <span className="hamburger-icon">&#9776;</span>
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex">
            {(!user || !user.token) && (
              <div className="cursor-pointer">
                <PersonOutlineOutlinedIcon onClick={onUserIconClick} />
              </div>
            )}
            {user && user.token && (
              <div className="cursor-pointer mx-1">
                <LogoutIcon onClick={onLogoutClick} />
              </div>
            )}
          </div>
        </div>
      </UpperBelt>
      {mobileMenuBreakpoint > currentWidth && (
        <Collapse isOpen={mobileMenuVisibleState}>
          <NavbarListItems items={items} display="mobile" />
        </Collapse>
      )}
      <Modal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        title="zaloguj się"
      >
        <Login />
      </Modal>
    </NavbarWrapper>
  );
};
export default MainNavbarComponent;
