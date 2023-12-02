import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classes from "./Dropdown.module.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";

const Dropdown = () => {
  const [login, setLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:4000/getUserDetailById", { id: token })
      .then((res) => {
        // console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
  }, []);

  const defaultImg =
    "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";
  // console.log(proImg);

  const close = "60px";
  const open = "200px";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {login && (
        <div
          style={{
            height: `${isOpen ? open : close}`,
          }}
          className={classes.outerBox}
        >
          <div className={classes.wrapper}>
            <div
              className={classes.header}
              onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            >
              {userInfo?.isVerified && userInfo?.firstName && (
                <span style={{ width: "10rem" }}>
                  {userInfo?.firstName + " " + userInfo?.lastName + " "}
                  <VerifiedIcon style={{ color: "#1976D2" }} />
                </span>
              )}
              {!userInfo?.isVerified && userInfo?.firstName && (
                <span style={{ width: "10rem" }}>
                  {userInfo?.firstName + " " + userInfo?.lastName}
                </span>
              )}
              <img
                className={classes.dropdownLogo}
                src={userInfo?.imgURL || defaultImg}
              />
              {isOpen ? (
                <KeyboardArrowUpIcon fontSize="large" />
              ) : (
                <KeyboardArrowDownIcon fontSize="large" />
              )}
            </div>
          </div>
          <ul style={{ paddingLeft: "0px" }}>
            <Link style={{ color: "black" }} to="/myRides">
              <li>My rides</li>
            </Link>
            <Link style={{ color: "black" }} to="/profile">
              <li>Profile</li>
            </Link>
            <Link style={{ color: "black" }} to="/chatBox">
              <li>Inbox</li>
            </Link>
            <li style={{ color: "black" }} onClick={authCtx.logout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
