import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const NavbarButtons = function ({ icon, menuItems, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClick = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {menuItems ? (
        <>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "white" }}
          >
            {icon}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {menuItems?.map((menuItem) => {
              return (
                <Link key={menuItem.name} to={menuItem.path}>
                  <MenuItem onClick={handleOnClick}>{menuItem.name}</MenuItem>
                </Link>
              );
            })}
          </Menu>
        </>
      ) : (
        <Link to={name}>
          <IconButton style={{ color: "white" }}>{icon}</IconButton>
        </Link>
      )}
    </div>
  );
};

export default NavbarButtons;

NavbarButtons.defaultProps = {
  name: "",
};
NavbarButtons.propTypes = {
  name: PropTypes.string,
};
