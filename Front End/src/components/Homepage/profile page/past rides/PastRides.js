import axios from "axios";
import React, { useEffect, useState } from "react";
import RideResult from "../../../ride res/RideResult";
import classes from "./PastRides.module.css";

const PastRides = () => {
  const [rideData, setRideData] = useState();

  useEffect(() => {
    const id = localStorage.getItem("token");
    axios
      .post("http://localhost:4000/getRideDetailById", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        setRideData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <RideResult rideData={rideData} />
    </>
  );
};

export default PastRides;
