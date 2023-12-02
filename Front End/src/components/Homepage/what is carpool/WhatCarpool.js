import React from "react";
import classes from "./WhatCarpool.module.css";
import Whatcarpool from "../../../utilites/Whatcarpool.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WhatCarpool = () => {
  return (
    <div className={classes.box1}>
      <div className={classes.box2}>
        <h1 className={classes.heading}>What is Carpool?</h1>
        <p>
          Carpool is revolutionary and fun way to travel. Whether you are a car
          owner, bike owner or a rider, just post your ride details on sRide and
          we will match you with co-riders on your way
        </p>
      </div>
      <div>
        <LazyLoadImage
          src={Whatcarpool}
          width={400}
          height={400}
          alt="Image Alt"
        />
      </div>
    </div>
  );
};

export default WhatCarpool;
