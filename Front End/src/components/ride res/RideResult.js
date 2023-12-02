import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./RideResult.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RideResultList from "./RideResultList";

// const rideData = [
//   {
//     startLocation: "Pune",
//     startTime: "17:00",
//     endLoaction: "Mumbai",
//     endTime: "20:30",
//     name: "Balraj Singh",
//     ratings: "4.5",
//     price: "₹450",
//     seatsLeft: "1",
//   },
//   {
//     startLocation: "Chennai",
//     startTime: "00:00",
//     endLoaction: "Banglore",
//     endTime: "05:30",
//     name: "Genilia",
//     ratings: "4.8",
//     price: "₹600",
//     seatsLeft: "2",
//   },
//   {
//     startLocation: "Delhi",
//     startTime: "07:00",
//     endLoaction: "jaipur",
//     endTime: "12:30",
//     name: "Pankaj sinha",
//     ratings: "4.9",
//     price: "₹300",
//     seatsLeft: "4",
//   },
// ];

const RideResult = (props) => {
  useEffect(() => {
    // console.log(props.rideData);
  }, []);

  return (
    // <div className={classes.bgmap}>
    //   <div>
    //     <Link to="/ridesurf">
    //       <button className={classes.back}>
    //         <ArrowBackIcon></ArrowBackIcon> Back
    //       </button>
    //     </Link>
    //   </div>
    <>
      {props.rideData &&
        props.rideData.map((x) => (
          <RideResultList
            key={x._id}
            setShowDetail={props.setShowDetail}
            id={x.driverId}
            data={x}
            setPin1={props.setPin1}
            setPin2={props.setPin2}
            startLocation={x.sLoc}
            startTime={x.stime}
            endLocation={x.eLoc}
            endTime={x.etime}
            price={350}
            seatsLeft={x.seats}
          />
        ))}
      {props.rideData && props.rideData.length === 0 && (
        <h1>No rides present for this day :/</h1>
      )}
    </>
    // </div>
  );
};

export default RideResult;
