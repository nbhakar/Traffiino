import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import AccInfo from "./account info/AccInfo";
import ChangePass from "./account info/change pass/ChangePass";
import DocPage from "./doc page/DocPage";
import PastRides from "./past rides/PastRides";
import PersonalInfo from "./personal/PersonalInfo";
import classes from "./ProfilePage.module.css";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

const ProfilePage = () => {
  const [pinfo, setpinfo] = useState(true);
  const [doc, setdoc] = useState(false);
  const [prides, setprides] = useState(false);
  const [account, setaccount] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      const id = localStorage.getItem("token");
      // console.log(id);
      axios
        .post("http://localhost:4000/getUserDetailById", { id: id })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch(() => {
          console.log("userDetailsError");
        });
    } catch (error) {}
  };

  const pinfoHandler = () => {
    setpinfo(true);
    setdoc(false);
    setprides(false);
    setaccount(false);
  };
  const docHandler = () => {
    setpinfo(false);
    setdoc(true);
    setaccount(false);
    setprides(false);
  };
  const prideHandler = () => {
    setpinfo(false);
    setdoc(false);
    setaccount(false);
    setprides(true);
  };
  const accHandler = () => {
    setpinfo(false);
    setdoc(false);
    setaccount(true);
    setprides(false);
  };

  return (
    <>
      <Navbar />
      <div className={classes.outer}>
        <div className={classes.box1}>
          <div className={classes.box3}>
            <ul className={classes.navbox}>
              <li
                className={`${pinfo ? classes.active : ""} ${classes.navitems}`}
                onClick={pinfoHandler}
              >
                Personal
              </li>
              <li
                className={`${classes.navitems} ${doc ? classes.active : ""}`}
                onClick={docHandler}
              >
                Documents
              </li>
              {/* <li
                className={`${classes.navitems} ${
                  prides ? classes.active : ""
                }`}
                onClick={prideHandler}
              >
                Past rides
              </li> */}
              <li
                className={`${classes.navitems} ${
                  account ? classes.active : ""
                }`}
                onClick={accHandler}
              >
                Account
              </li>
              <li onClick={() => authCtx.logout()} className={classes.navitems}>
                Logout
              </li>
            </ul>
          </div>
          <div className={classes.box2}>
            {pinfo && userDetails && <PersonalInfo userDetails={userDetails} />}
            {doc && userDetails && <DocPage userDetails={userDetails} />}
            {account && userDetails && <AccInfo userDetails={userDetails} />}
            {/* {prides && userDetails && <PastRides userDetails={userDetails} />} */}
            {/* <ChangePass /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
