import React, { useEffect, useState } from "react";
import classes from "./MyRidesList.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import RatingModal from "../../../UI/modal/RatingModal";
import useGeoLocation from "../../../hooks/UseGeoLocation";
import Map from "../../map/Map";
import OpenChat from "../../../UI/modal/OpenChat";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShowRiders from "./ShowRiders";

const MyRidesList = (props) => {
  const startAdd = props.startLocation.split(",");
  const endAdd = props.endLocation.split(",");
  const [userInfo, setUserInfo] = useState();
  const [first, setfirst] = useState();
  const [ratModal, setRatModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [showRiders, setShowRiders] = useState(false);
  const [liveLocation, setliveLocation] = useState(false);

  const defaultImg =
    "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";

  const ratingHandler = () => {
    // alert("completed");
    setRatModal(true);
  };
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const rideCompletedHandler = async () => {
    try {
      await axios.post("http://localhost:4000/rideCompleted", {
        id: props.data?._id,
      });
      alert("successful");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const rideStartHandler = async () => {
    try {
      await axios.post("http://localhost:4000/rideStarted", {
        id: props.data?._id,
      });
      alert("successful");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const showLiveLocHandler = async () => {
    setliveLocation(true);
  };

  useEffect(() => {
    const token = props.id;
    // console.log("he");
    // console.log(props.data);
    axios
      .post("http://localhost:4000/getUserDetailById", { id: token })
      .then((res) => {
        // console.log(res.data.firstName);
        setUserInfo(res.data);
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
  }, []);

  return (
    <>
      {ratModal && !liveLocation && (
        <RatingModal
          id={props.data?.driverId}
          setRating={setRating}
          ratModal={ratModal}
          setRatModal={setRatModal}
        />
      )}
      {/* <Modal /> */}
      {chatModal && (
        <OpenChat
          chatModal={chatModal}
          setChatModal={setChatModal}
          id={props.data?.driverId}
        />
      )}
      {!liveLocation && (
        <div className={classes.tripCard}>
          <div style={{ gap: "8px" }} />
          <div style={{ fontWeight: "bold" }}>
            {formatDate(props.data.date)}
          </div>
          <div className={classes.box1}>
            <div className={classes.column}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {startAdd[0]}
              </span>
              <span>{props.startTime}</span>
            </div>
            <div className={classes.bar} />
            <div className={classes.column}>
              <span
                style={{
                  width: "10rem",
                  fontSize: "20px",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textAlign: "end",
                }}
              >
                {endAdd[0]}
              </span>
              <span style={{ textAlign: "end" }}>{props.endTime}</span>
            </div>
          </div>
          <div className={classes.box1}>
            <div className={classes.box2}>
              <img src={userInfo?.imgURL || defaultImg} />
              <div className={classes.box3}>
                {userInfo?.isVerified && (
                  <span
                    style={{
                      fontSize: "20px",
                      width: "10rem",
                    }}
                  >
                    {userInfo?.firstName + " " + userInfo?.lastName + " "}
                    <VerifiedIcon style={{ color: "#1976D2" }} />
                  </span>
                )}
                {!userInfo?.isVerified && (
                  <span style={{ fontSize: "20px", width: "10rem" }}>
                    {userInfo?.firstName + " " + userInfo?.lastName}
                  </span>
                )}
                <span className={classes.row}>
                  <StarBorderIcon /> {userInfo?.rating}
                </span>
              </div>
            </div>
            <div className={classes.column}>
              <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                {props.data.price}₹
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "gray",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PersonIcon /> {props.seatsLeft}
              </span>
            </div>
          </div>
          <div className={classes.box5}>
            {props.type === "driver" && (
              <button
                onClick={() => setShowRiders(true)}
                className={classes.btn}
              >
                Show riders
              </button>
            )}
            {props.type === "driver" &&
              props.data.status === "yet to start" && (
                <button onClick={rideStartHandler} className={classes.btn}>
                  Start ride
                </button>
              )}
            {props.type === "driver" &&
              props.data.status === "ride started" && (
                <button onClick={rideCompletedHandler} className={classes.btn}>
                  End ride
                </button>
              )}
            {props.type === "rider" && props.data.status === "ride started" && (
              <button
                onClick={() => {
                  props.setlocation(true);
                  props.setCoordinates({
                    x1: props.data.eLocPoint[1],
                    y1: props.data.eLocPoint[0],
                    liveLoc: props.data.liveLocation,
                  });
                }}
                className={classes.btn}
              >
                Live location
              </button>
            )}
            {props.type === "rider" && (
              <button
                onClick={() => setChatModal(true)}
                className={classes.btn}
              >
                Contact now
              </button>
            )}
            {props.type === "rider" && props.data.status === "completed" && (
              <button onClick={ratingHandler} className={classes.btn}>
                Provide rating
              </button>
            )}
            {props.data.status === "yet to start" && (
              <span className={classes.pending}>{props.data.status}</span>
            )}
            {props.data.status === "ride started" && (
              <span className={classes.ongoing}>{props.data.status}</span>
            )}
            {props.data.status === "completed" && (
              <span className={classes.completed}>{props.data.status}</span>
            )}
          </div>
        </div>
      )}
      {showRiders && (
        <ShowRiders id={props.data._id} setShowRiders={setShowRiders} />
      )}
    </>
  );
};

export default MyRidesList;
