import React from "react";
import Modal from "@mui/material/Modal";
import BasicRating from "../rating/rating";
import classes from "./RatingModal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -80%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "13px",
  boxShadow: 24,
  p: 4,
};

const RatingModal = (props) => {
  const [rating, setRating] = useState();
  const ratingAddHandler = async () => {
    props.setRatModal(false);
    try {
      console.log(props.id);
      console.log(rating);
      const { data } = await axios.post("http://localhost:4000/updateRating", {
        id: props.id,
        addRating: rating,
      });
      await axios.post("http://localhost:4000/rideCompleted", {
        id: props.rideId,
      });
      alert("successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        open={props.ratModal}
        onClose={() => props.setRatModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className={classes.ratHeading}>Offerer rating</h1>
          <div className={classes.center}>
            <BasicRating setRating={setRating} />
            <button onClick={ratingAddHandler} className={classes.btn}>
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default RatingModal;
