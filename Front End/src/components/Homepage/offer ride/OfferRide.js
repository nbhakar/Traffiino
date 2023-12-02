import React from "react";
import offerride from "../../../utilites/OfferRide.jpg";
import findride from "../../../utilites/FindRide.jpg";
import classes from "./OfferRide.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OfferRide = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.card1}>
        <LazyLoadImage
          src={offerride}
          width={600}
          height={400}
          alt="Image Alt"
        />
        <div className={classes.text1}>
          <h2>Want some company?</h2>
          <p>Why go alone when you can have company</p>
          <Link to="/ridesurf">
            <button className={classes.btn}>Offer Ride</button>
          </Link>
        </div>
      </div>
      <div className={classes.card2}>
        <div className={classes.text2}>
          <h2>Find Ride at one click.</h2>
          <p>Who said you can't network in traffic.</p>
          <Link to="/ridesurf">
            <button className={classes.btn}>Find Ride</button>
          </Link>
        </div>
        <LazyLoadImage
          src={findride}
          width={600}
          height={400}
          alt="Image Alt"
        />
      </div>
    </div>
  );
};

export default OfferRide;
