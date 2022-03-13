import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const ListWrapper = styled.div`
  a {
    color: #fff;
    text-decoration: none;
  }
  &.mobile {
    .list-item-wrapper {
      margin: 15px 0;
    }
  }
  &.desktop {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: 14px;
    @media all and (min-width: 576px) {
      font-size: 16px;
    }
    @media all and (min-width: 768px) {
      justify-content: center;
    }
    a {
      padding: 3px 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      transition: all 0.3s ease;
      &:hover {
        border-bottom: 1px solid #fff;
      }
      &.active {
        border-bottom: 1px solid #fff;
      }
    }
  }
`;

const ListItemWrapper = styled.div`
  text-align: center;
  margin: 0 5px;
  @media all and (min-width: 576px) {
    margin: 0 10px;
  }
  @media all and (min-width: 768px) {
    margin: 0 20px;
  }
`;

const ListItemsComponent = function ({ items, display }) {
  const location = useLocation();

  function checkIfItemIsActive(itemConfig) {
    const link = itemConfig.link.includes("/")
      ? itemConfig.link
      : `/${itemConfig.link}`;

    return location.pathname === link;
  }

  return (
    <ListWrapper className={display}>
      {items.map((e) => {
        return (
          <ListItemWrapper className="list-item-wrapper" key={e.link}>
            <Link
              className={checkIfItemIsActive(e) ? "active" : ""}
              to={e.link}
            >
              {e.name}
            </Link>
          </ListItemWrapper>
        );
      })}
    </ListWrapper>
  );
};

export default ListItemsComponent;
