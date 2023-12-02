import React, { useEffect, useRef } from "react";
import classes from "./PersonalBio.module.css";
import CloseIcon from "@mui/icons-material/Close";

const PersonalBio = (props) => {
  const bioIp = useRef(props.bioValue);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const clickHandler = () => {
    props.setBioValue(bioIp.current.value);
    props.setbio(false);
  };
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setbio(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>
          Tell others something about yourself!
        </h1>
        <textarea
          rows={"4"}
          //   style={{ height: "6rem", padding: "0.1rem 1.7rem" }}
          defaultValue={props.bioValue}
          ref={bioIp}
        />
        <div className={classes.align}>
          <button onClick={clickHandler} className={classes.savebtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalBio;
