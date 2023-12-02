import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import logo from "./../../utilites/logo.png";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import AuthContext from "../../store/auth-context";
import InboxIcon from "@mui/icons-material/Inbox";

const Navbar = () => {
  let history = useHistory();
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn);

  const homepageHandler = () => {
    history.push("/");
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.logo} onClick={homepageHandler}>
        <img src={logo} />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.links}>
          {/* <ul className={classes.list}>
            <li className={classes.items}>Home</li>
            <li className={classes.items}>About</li>
            <li className={classes.items}>ContactUs</li>
            <Link to="/faq">
              <li className={classes.items}>FAQ's</li>
            </Link>
          </ul> */}
        </div>
        <div className={classes.links}>
          <ul className={classes.list}>
            {!authCtx.isLoggedIn && (
              <>
                <li className={classes.button}>
                  <Link to="/login">
                    <button className={classes.btn}>Login</button>
                  </Link>
                </li>
                <li className={classes.button}>
                  <Link to="/signup">
                    <button className={classes.btn}>Register</button>
                  </Link>
                </li>
              </>
            )}

            {authCtx.isLoggedIn && (
              <li>
                <Dropdown />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
