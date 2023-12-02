import React, { useState } from "react";
import classes from "./Faq.module.css";

const Faq = (props) => {
  const [height, setHeight] = useState(true);
  const collapseHandler = () => {
    if (height === false) setHeight(true);
    else setHeight(false);
  };
  return (
    <div
      className={classes.collapse}
      style={{ height: `${height ? "60px" : "150px"}` }}
      onClick={collapseHandler}
    >
      <div className={classes.heading}>
        <h4>{props.question}</h4>
        <button>{height ? "+" : "-"}</button>
      </div>
      <p className={classes.content}>{props.answer};</p>
    </div>
  );
};

export default Faq;
