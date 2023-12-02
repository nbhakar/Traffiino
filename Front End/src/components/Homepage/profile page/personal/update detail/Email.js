import React, { useEffect, useRef } from "react";
import classes from "./Email.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Email = (props) => {
  const emailIp = useRef();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const clickHandler = () => {
    props.setEmailval(emailIp.current.value);
    props.setemail(false);
  };
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setemail(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your email</h1>
        <input defaultValue={props.emailval} ref={emailIp} />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
