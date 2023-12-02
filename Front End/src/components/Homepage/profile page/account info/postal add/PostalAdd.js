import React, { useEffect } from "react";
import classes from "./PostalAdd.module.css";
import CloseIcon from "@mui/icons-material/Close";

const PostalAdd = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className={classes.box1}>
      <button onClick={() => props.setpostal(false)} className={classes.close}>
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your Address?</h1>
        <input placeholder="Enter full address" />
        <div className={classes.align}>
          <button className={classes.savebtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PostalAdd;
