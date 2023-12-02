import React, { useEffect, useRef } from "react";
import classes from "./Lname.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Lname = (props) => {
  const lnameIp = useRef(props.lastname);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const clickHandler = () => {
    props.setLastname(lnameIp.current.value);
    props.setlname(false);
  };
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setlname(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your last name?</h1>
        <input defaultValue={props.lastname} ref={lnameIp} />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lname;
