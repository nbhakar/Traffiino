import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className={classes.background}>
      <p>uh-oh!</p>
      <h3>looks like you're lost...</h3>
      <div className={classes.error}>
        <h1>404</h1>
      </div>
      <div className={classes.centre}>
        <Button
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            padding: "3px 120px",
            fontSize: "20px",
            marginTop: "50px",
          }}
          onClick={() => history.push("/")}
        >
          <i class="fas fa-chevron-left"></i> &nbsp;&nbsp; Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
