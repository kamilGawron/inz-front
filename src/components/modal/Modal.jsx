import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const ModalCustom = function ({ open, setOpen, children, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className="flex items-center justify-end" sx={{ mb: 2 }}>
          <Box sx={{ flexBasis: "90%" }} className="flex justify-center">
            {capitalizeFirstLetter(title)}
          </Box>
          <button type="button" onClick={handleClose}>
            <CloseIcon />
          </button>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default ModalCustom;

ModalCustom.defaultProps = {
  open: false,
  setOpen: () => {},
  children: null,
};
ModalCustom.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
