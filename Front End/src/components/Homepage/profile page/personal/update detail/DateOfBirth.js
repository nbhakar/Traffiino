import React, { useEffect, useRef } from "react";
import classes from "./DateOfBirth.module.css";
import CloseIcon from "@mui/icons-material/Close";

const DateOfBirth = (props) => {
  const dobIp = useRef(props.dateOB);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const clickHandler = () => {
    props.setDateOB(dobIp.current.value);
    props.setdob(false);
  };
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setdob(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your date of birth?</h1>
        <input type={"date"} ref={dobIp} defaultValue={props.dateOB} />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirth;
