import React, { useEffect, useRef } from "react";
import classes from "./MobileNum.module.css";
import CloseIcon from "@mui/icons-material/Close";

const MobileNum = (props) => {
  const pnumIp = useRef(props.pnumValue);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const clickHandler = () => {
    props.setPnumValue(pnumIp.current.value);
    props.setpnum(false);
  };
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setpnum(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your Mobile Number?</h1>
        <input defaultValue={props.pnumValue} ref={pnumIp} />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNum;
