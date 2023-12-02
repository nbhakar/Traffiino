import React, { useEffect, useRef } from "react";
import classes from "./Fname.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Fname = (props) => {
  const fnameIp = useRef(props.firstname);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const clickHandler = () => {
    props.setFirstName(fnameIp.current.value);
    props.setfname(false);
  };

  return (
    <div className={classes.box1}>
      <button onClick={() => props.setfname(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your first name?</h1>
        <input defaultValue={props.firstname} ref={fnameIp} />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fname;
