import React, { useEffect, useState } from "react";
import classes from "./RideResultList.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";

const RideResultList = (props) => {
  const startAdd = props.startLocation.split(",");
  const endAdd = props.endLocation.split(",");
  const [userInfo, setUserInfo] = useState();
  const [booker, setBooker] = useState();
  const defaultImg =
    "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    const token = props.data.driverId;
    // console.log("he");
    // console.log(props.data);
    axios
      .post(
        "http://localhost:4000/getUserDetailById",
        { id: token },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });

    const token1 = localStorage.getItem("token");
    axios
      .post("http://localhost:4000/getUserDetailById", { id: token1 })
      .then((res) => {
        // console.log(res.data);
        setBooker(res.data);
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
  }, []);

  const addRiderHandler = async () => {
    const riderId = localStorage.getItem("token");
    const rideId = props.data._id;
    // console.log(riderId, rideId);
    const amount = props.data.price * 100;

    const {
      data: { key },
    } = await axios.get("http://www.localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/checkout", {
      amount,
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Traffiino",
      description: "payment for ride",
      image: "https://ibb.co/HrkZdgK",
      order_id: order.id,
      callback_url: "http://localhost:4000/paymentVerification",
      prefill: {
        name: booker?.firstName + " " + booker?.lastName,
        email: booker?.email,
        contact: booker?.mobileNum,
      },
      notes: {
        address: "Traffiino Pvt Ltd",
      },
      theme: {
        color: "#27ae60",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    console.log(order);

    axios
      .post("http://localhost:4000/riderBooking", {
        id: props.data._id,
        bookSeats: 1,
        riderId: riderId,
      })
      .then((res) => {})
      .catch((err) => {});
    axios
      .post("http://localhost:4000/addRider", {
        rideeId: rideId,
        riderrId: riderId,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const setPinHandler = () => {
    const point1 = {
      lat: props.data.sLocPoint[0],
      lon: props.data.sLocPoint[1],
    };
    props.setPin1(point1);
    const point2 = {
      lat: props.data.eLocPoint[0],
      lon: props.data.eLocPoint[1],
    };
    props.setPin2(point2);
  };

  return (
    <>
      {
        <div className={classes.tripCard} onClick={setPinHandler}>
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
                  width: "1s0px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  overflow: "hidden",
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
                    {userInfo?.firstName + " " + userInfo?.lastName}
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
          <div>
            <button
              onClick={() => props.setShowDetail(props.data)}
              className={classes.detailBtn}
            >
              View details
            </button>
          </div>
          <div>
            <button onClick={addRiderHandler} className={classes.btn}>
              Book now
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default RideResultList;
