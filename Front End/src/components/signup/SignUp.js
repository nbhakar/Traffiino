import React from "react";
import classes from "./SignUp.module.css";
import { Button, Container } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "./../../utilites/logo.png";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const SignUp = () => {
  const history = useHistory();
  const passInputRef = useRef();
  const cnfPassInputRef = useRef();
  const emailInputRef = useRef();
  const lnameInputRef = useRef();
  const fnameInputRef = useRef();
  const dobInputRef = useRef();
  const [formValidity, setFormValidity] = useState(true);
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  //   const history = useHistory();

  const passwordToggleHandler = () => {
    const x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredFname = fnameInputRef.current.value;
    const enteredLname = lnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const entereddob = dobInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const cnfrmPass = cnfPassInputRef.current.value;

    if (enteredFname.length < 1) {
      fnameInputRef.current.focus();
      setFormValidity(false);
    } else if (enteredLname.length < 1) {
      lnameInputRef.current.focus();
      setFormValidity(false);
    } else if (!enteredEmail.includes("@")) {
      emailInputRef.current.focus();
      setFormValidity(false);
    } else if (entereddob.length < 1) {
      dobInputRef.current.focus();
      setFormValidity(false);
    } else if (enteredPass.length < 7) {
      passInputRef.current.focus();
      setFormValidity(false);
    } else if (cnfrmPass !== enteredPass) {
      cnfPassInputRef.current.focus();
      setFormValidity(false);
      console.log("not match");
    } else {
      setFormValidity(true);

      axios
        .post("http://localhost:4000/registerUser", {
          email: enteredEmail,
          password: enteredPass,
          firstName: enteredFname,
          lastName: enteredLname,
          dob: entereddob,
          mobileNumber: "",
          bio: "",
          gender: value,
        })
        .then((res) => {
          setFormValidity(true);
          console.log("res", res.data);
          // authCtx.login(res.data.authToken);
          alert("Successfully Registered");
          const token = res.data._id;
          axios
            .post("http://localhost:4000/chatSignup", {
              username: token,
              secret: token,
              email: enteredEmail,
              first_name: enteredFname,
              last_name: enteredLname,
            })
            .then((r) => console.log(r.data)) // NOTE: over-ride secret
            .catch((e) => console.log(e));
          history.push("/login");
          // emailInputRef.current.value = "";
          // passInputRef.current.value = "";
          // cnfPassInputRef.current.value = "";
        })
        .catch((err) => {
          console.log("errdaflsdf");
          setFormValidity(false);
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
              <h2>Sign Up</h2>
              <p>Create new Account</p>
              <form className={classes.signUpForm} onSubmit={formSubmitHandler}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="fname" className={classes.block}>
                      Firstname
                    </label>
                    <input
                      type="text"
                      id="fname"
                      ref={fnameInputRef}
                      className={classes.fullLen}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="lname" className={classes.block}>
                      Lastname
                    </label>
                    <input
                      type="text"
                      id="lname"
                      ref={lnameInputRef}
                      className={classes.fullLen}
                    />
                  </div>
                </div>
                <label htmlFor="date" className={classes.block}>
                  Date of birth
                </label>
                <input
                  type="date"
                  id="date"
                  ref={dobInputRef}
                  className={classes.fullLen}
                />
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
                  password
                </label>
                <input
                  type="text"
                  id="pass"
                  className={classes.fullLen}
                  minLength="7"
                  ref={passInputRef}
                />
                <label htmlFor="cnfpass" className={classes.block}>
                  Enter password again
                </label>
                <input
                  type="password"
                  id="cnfpass"
                  className={classes.fullLen}
                  minLength="7"
                  ref={cnfPassInputRef}
                />
                <FormControl>
                  <label className={classes.block}>Gender</label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={value}
                    onChange={handleChange}
                    name="controlled-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                {!formValidity && (
                  <div className={classes.invalid}>
                    <span className={classes.invalidText}>INVALID INPUT</span>
                  </div>
                )}
                <button type="submit" className={classes.btn}>
                  Sign in
                </button>
              </form>
            </div>
          </Container>
          <div className={classes.registerDirect}>
            <div>Already registered?</div>
            <Link to="/login">
              <p>Login now.</p>
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

export default SignUp;
