import axios from "axios";
import React, { useEffect, useState } from "react";
import BookMap from "./BookMap";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./Bookride.module.css";
import { MDBIcon } from "mdb-react-ui-kit";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const Bookride = (props) => {
  const [driverInfo, setDriverInfo] = useState();
  const [riderInfo, setRiderInfo] = useState();
  const [tempData, setTempData] = useState();
  const defaultImg =
    "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";

  const loadOnStart = async () => {
    // try {
    const driverId = props.data.driverId;
    const res = await axios.post("http://localhost:4000/getUserDetailById", {
      id: driverId,
    });
    setDriverInfo(res.data);
    if (props.data.riders) {
      let data = [];
      for (let i = 0; i < props.data.riders.length; i++) {
        const riderId = props.data.riders[i];
        const res = await axios.post(
          "http://localhost:4000/getUserDetailById",
          {
            id: riderId,
          }
        );
        data.push(res.data);
      }
      setRiderInfo(data);
    }
    // console.log(driverInfo, riderInfo);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    loadOnStart();
    console.log(riderInfo);
  }, []);

  const closeHandler = () => {
    props.setShowDetail();
    setDriverInfo();
    setRiderInfo();
  };

  return (
    <div className={classes.column}>
      <button onClick={closeHandler} className={classes.close}>
        <CloseIcon fontSize="large" />
      </button>
      {driverInfo && (
        <>
          <h2 className={classes.driverHeading}>Driver Details</h2>
          <div className={classes.tripCard}>
            <div className={classes.box1}>
              <img
                src={driverInfo.imgURL || defaultImg}
                className={classes.box2}
              />
              <div className={classes.box3}>
                <p className={classes.brp1}>
                  <MDBIcon fas icon="quote-left" /> {driverInfo.bio + " "}
                  <MDBIcon fas icon="quote-right" />
                </p>
                <h2 className={classes.brh2}>
                  {driverInfo.firstName + " " + driverInfo.lastName}
                  {" , " + calculateAge(driverInfo.dateOfBirth)}
                </h2>
                <p>{driverInfo.gender === "male" ? "Male" : "Female"}</p>
              </div>

              {/* <Button className="CheckButton">Check it out!</Button> */}
            </div>
            <p>Rides Completed : {driverInfo?.rideCompleted}</p>
            {/* <div>{driverInfo.mobileNum}</div> */}
          </div>
        </>
      )}
      {<h2 className={classes.driverHeading}>Rider Details</h2>}
      {riderInfo &&
        riderInfo.length > 0 &&
        riderInfo.map((e) => (
          <>
            <div className={classes.tripCard}>
              <div className={classes.box1}>
                <img src={e.imgURL || defaultImg} className={classes.box2} />
                <div className={classes.box3}>
                  {e.bio && (
                    <p className={classes.brp1}>
                      <MDBIcon fas icon="quote-left" /> {e.bio}
                      <MDBIcon fas icon="quote-right" />
                    </p>
                  )}
                  <h2 className={classes.brh2}>
                    {e.firstName +
                      " " +
                      e.lastName +
                      " , " +
                      calculateAge(e.dateOfBirth)}
                  </h2>
                  <p>{e.gender === "male" ? "Male" : "Female"}</p>
                </div>

                {/* <Button className="CheckButton">Check it out!</Button> */}
              </div>
            </div>
          </>
        ))}
      {riderInfo && riderInfo.length == 0 && (
        <p style={{ fontSize: "1.3rem" }} className={classes.driverHeading}>
          No rider travelling yet!
        </p>
      )}
    </div>
  );
};

export default Bookride;

const calculateAge = (userinput) => {
  if (!userinput) return "";
  var dob = new Date(userinput);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  return age;
};
