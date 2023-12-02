import React, { useEffect, useRef } from "react";
import classes from "./ChangePass.module.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ChangePass = (props) => {
  const curPass = useRef();
  const newPass = useRef();
  const newPassCnf = useRef();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const submitHandler = async () => {
    if (newPassCnf.current.value === newPass.current.value) {
      const id = localStorage.getItem("token");
      try {
        axios
          .post("http://localhost:4000/changePassword", {
            id: id,
            prevPassword: curPass.current.value,
            newPassword: newPass.current.value,
          })
          .then(() => {
            console.log("successful");
            props.setchangepass(false);
          })
          .catch(() => {
            alert("invalid credentials");
          });
      } catch (error) {
        alert("invalid credentials");
      }
    } else {
      alert("invalid credentials");
    }
  };
  return (
    <div className={classes.box1}>
      <button
        onClick={() => props.setchangepass(false)}
        className={classes.close}
      >
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>Change Password.</h1>
        <input placeholder="Current password" ref={curPass} />
        <input placeholder="New password" ref={newPass} />
        <input placeholder="Confirm new password" ref={newPassCnf} />
        <div className={classes.align}>
          <button onClick={submitHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
