import React, { useEffect } from "react";
import classes from "./BankDetail.module.css";
import CloseIcon from "@mui/icons-material/Close";

const BankDetail = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className={classes.box1}>
      <button
        onClick={() => props.setBankdetail(false)}
        className={classes.close}
      >
        <CloseIcon />
      </button>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What's your bank details?</h1>
        <input placeholder="Account holder name" />
        <input placeholder="Bank name" />
        <input placeholder="Account number" />
        <input placeholder="ifsc code" />
        <div className={classes.align}>
          <button className={classes.savebtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default BankDetail;
