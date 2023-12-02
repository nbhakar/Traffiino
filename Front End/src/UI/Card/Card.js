import React, { useState } from "react";
import classes from "./Card.module.css";
import StarsIcon from "@mui/icons-material/Stars";
import Modal from "@mui/material/Modal";

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={classes.mcard}>
            <img src={props.img} position="top" alt="..." />
            <div className={classes.mbody}>
              <div className={classes.mtitleBox}>
                <div className={classes.biowrapper}>
                  <p>Name</p>
                  <p>{props.title}</p>
                </div>
                <div className={classes.biowrapper}>
                  <p>Avg Ratings</p>
                  <p>
                    <span className={classes.mrating}>
                      {props.rating} <StarsIcon />
                    </span>
                  </p>
                </div>
                <div className={classes.biowrapper}>
                  <p>About</p>
                  <p>{props.desc}</p>
                </div>
                <div className={classes.biowrapper}>
                  <p>Place</p>
                  <p>Pune</p>
                </div>
                <button onClick={handleClose} className={classes.btn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className={classes.card}>
        <img src={props.img} position="top" alt="..." />
        <div className={classes.body}>
          <div className={classes.titleBox}>
            <p className={classes.title}>{props.title}</p>
            <span className={classes.rating}>
              {props.rating} <StarsIcon />
            </span>
          </div>
          <div className={classes.text}>{props.desc}</div>
          <button onClick={handleOpen} className={classes.btn}>
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
