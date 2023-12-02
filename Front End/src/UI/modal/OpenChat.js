import React from "react";
import Modal from "@mui/material/Modal";
import BasicRating from "../rating/rating";
import classes from "./RatingModal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -80%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "13px",
  boxShadow: 24,
  p: 4,
};

const OpenChat = (props) => {
  return (
    <>
      <Modal
        open={props.chatModal}
        onClose={() => props.setChatModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className={classes.ratHeading}>{props.id}</h1>
          <h3 className={classes.ratHeading}>
            Copy this ID and paste in search to create chat
          </h3>
          <div className={classes.center}>
            <Link to="/chatBox">
              <button className={classes.btn}> Open Chatbox</button>
            </Link>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default OpenChat;
