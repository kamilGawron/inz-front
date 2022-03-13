import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import mainHeaderLogo from "../../assets/images/main-header-00.jpg";
import MainButton from "../global/ui/UiButton";

const MainHeaderWrapper = styled.div`
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;
const OverlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
`;
const MainHeaderBookingSection = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 80%;
  bottom: 100px;
  left: 10%;
  @media all and (min-width: 576px) {
    width: max-content;
    left: auto;
    right: 100px;
  }
`;
const HeaderBookingSection = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 20px -4px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  @media all and (min-width: 992px) {
    padding: 50px 80px;
  }
`;

const BrandNameDescription = styled.button`
  margin: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 20px;
`;

const Header = function () {
  return (
    <MainHeaderWrapper style={{ backgroundImage: `url(${mainHeaderLogo})` }}>
      <OverlayWrapper>
        <MainHeaderBookingSection>
          <Fade bottom duration={1500} delay={600}>
            <HeaderBookingSection>
              <BrandNameDescription>
                Brand Name Description
              </BrandNameDescription>
              <Link to="/booking">
                <MainButton
                  customStyle={{
                    border: "2px solid #000",
                    fontSize: "1.2rem",
                    padding: "10px 25px",
                  }}
                  text="Zarezerwuj wizytę"
                />
              </Link>
            </HeaderBookingSection>
          </Fade>
        </MainHeaderBookingSection>
      </OverlayWrapper>
    </MainHeaderWrapper>
  );
};

export default Header;
