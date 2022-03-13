import React from "react";
import { push as Menu } from "react-burger-menu";
import "../../styles/components/adminSidebarStyle.scss";
import { Link } from "react-router-dom";

const AdminSidebar = function ({ onOpenStateChange, navPages }) {
  return (
    <div>
      {" "}
      <Menu
        onStateChange={onOpenStateChange}
        noOverlay
        pageWrapId="page-wrap"
        isOpen
        disableOverlayClick
      >
        {navPages.map((e) => {
          return (
            <Link key={e.name} id={e.name} className="menu-item" to={e.link}>
              {e.name}
            </Link>
          );
        })}
      </Menu>
    </div>
  );
};

export default AdminSidebar;
