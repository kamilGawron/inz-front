import React from "react";
import styled from "styled-components";

const TopHeaderWrapper = styled.div`
  position: fixed;
  background-color: #fff;
  z-index: 2000;
  width: 100%;
  font-size: 1.5em;
  text-align: center;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0 15px -7px #000;

  @media all and (min-width: 576px) {
    padding: 10px;
  }
  @media all and (min-width: 768px) {
    padding: 10px 20px;
  }
`;
const AdminCompanyNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const AdminHeaderCompanyLogoImg = styled.img`
  height: 45px;
  margin: 0 10px 0 0;
  @media all and (min-width: 576px) {
    height: 60px;
    margin: 0 20px 0 0;
  }
`;
const AdminHeaderCompanyName = styled.h1`
  font-size: 16px;
  padding: 0;
  margin: 0;
  font-weight: 400;
  @media all and (min-width: 576px) {
    font-size: 20px;
  }
`;

const AdminCurrentUserDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CurrentUserImage = styled.div`
  height: 40px;
  width: 40px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  @media all and (min-width: 576px) {
    height: 50px;
    width: 50px;
  }
`;

const CurrentUserName = styled.div`
  font-size: 14px;
  margin-left: 15px;
  display: none;
  @media all and (min-width: 400px) {
    display: block;
  }
  @media all and (min-width: 576px) {
    font-size: 16px;
  }
`;

export default function adminHeader(props) {
  return (
    <div>
      <TopHeaderWrapper>
        <AdminCompanyNameWrapper>
          <AdminHeaderCompanyLogoImg
            alt=""
            height="50px"
            width="50px"
            src={props.logo}
          />
          <AdminHeaderCompanyName>{props.name}</AdminHeaderCompanyName>
        </AdminCompanyNameWrapper>
        <AdminCurrentUserDataWrapper>
          <CurrentUserImage
            style={{
              backgroundImage: `url(${props.loggedUserImg})`,
            }}
          />
          <CurrentUserName>{props.loggedUserName}</CurrentUserName>
        </AdminCurrentUserDataWrapper>
      </TopHeaderWrapper>
    </div>
  );
}
