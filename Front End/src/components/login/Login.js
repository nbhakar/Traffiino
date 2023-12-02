import React from "react";
import classes from "./Login.module.css";
import { Button, Container } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "./../../utilites/logo.png";
import AuthContext from "../../store/auth-context";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const passInputRef = useRef();
  const emailInputRef = useRef();
  const [formValidity, setFormValidity] = useState(true);
  const [invalidInp, setInvalidInp] = useState(false);
  const history = useHistory();

  const passwordToggleHandler = () => {
    const x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const formSubmitHandler = async (event) => {
    // console.log("login clicked");
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    if (!enteredEmail.includes("@")) {
      emailInputRef.current.focus();
      setFormValidity(false);
    } else if (enteredPass.trim().length < 7) {
      passInputRef.current.focus();
      setFormValidity(false);
    } else {
      axios
        .post("http://localhost:4000/loginUser", {
          username: enteredEmail,
          password: enteredPass,
        })
        .then((res) => {
          console.log(res.data);
          setFormValidity(true);
          authCtx.login(res.data);
          history.push("/");
        })
        .catch((err) => {
          // console.log("errdaflsdf");
          setInvalidInp(true);
        });
    }
  };

  return (
    <>
      <Link to="/">
        <div className={classes.back}>
          <ArrowBackIcon></ArrowBackIcon> Home
        </div>
      </Link>
      <div className={classes.wrapper}>
        <div className={classes.leftPanel}>
          <Container>
            <div className={classes.signIn}>
              <h2>Login</h2>
              <p>Login to your account</p>
              <form className={classes.signUpForm} onSubmit={formSubmitHandler}>
                <label htmlFor="email" className={classes.block}>
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailInputRef}
                  className={classes.fullLen}
                />
                <label htmlFor="pass" className={classes.block}>
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  className={classes.fullLen}
                  minLength="7"
                  ref={passInputRef}
                />
                <div className={classes.toggle}>
                  <div className={classes.allign}>
                    <input
                      type="checkbox"
                      id="toggle"
                      onClick={passwordToggleHandler}
                    />
                    <label className={`${classes.small}`} htmlFor="toggle">
                      Show Password
                    </label>
                  </div>
                  {/* <Link to="/forgotPass" className={classes.link}>
                  Forgot Password
                </Link> */}
                </div>
                {!formValidity && (
                  <div className={classes.invalid}>
                    <span className={classes.invalidText}>INVALID INPUT</span>
                  </div>
                )}
                {invalidInp && (
                  <div className={classes.invalid}>
                    <span className={classes.invalidText}>
                      INVALID PASSWORD/ID
                    </span>
                  </div>
                )}
                {/* <Button
                  type="submit"
                  className={classes.submitBtn}
                  style={{
                    backgroundColor: "#09AA4E",
                    color: "white",
                    fontSize: "17px",
                  }}
                >
                  Login
                </Button> */}
                <button type="submit" className={classes.btn}>
                  Log in
                </button>
              </form>
            </div>
          </Container>
          <div className={classes.registerDirect}>
            <div>Havent registered yet?</div>
            <Link to="/signup">
              <p>Register now.</p>
            </Link>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <img src={logo} />
        </div>
      </div>
    </>
  );
};

export default Login;
