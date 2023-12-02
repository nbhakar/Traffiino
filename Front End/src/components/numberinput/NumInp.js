import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./NumInp.module.css";

const NumInp = () => {
  return (
    <div className={classes.outer}>
      <PersonIcon />
      <input className={classes.input} placeholder="2" type={"number"} />
    </div>
  );
};

export default NumInp;
