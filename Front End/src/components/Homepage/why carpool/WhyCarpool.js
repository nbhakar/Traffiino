import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import HubIcon from "@mui/icons-material/Hub";
import ForestIcon from "@mui/icons-material/Forest";
import whycarImg from "../../../utilites/Whycarpool.png";
import classes from "./WhyCarpool.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WhyCarpool = () => {
  return (
    <div className={classes.box1}>
      <div className={classes.box3}>
        <h1>Why should I Carpool?</h1>
        <div className={classes.box2}>
          <SavingsIcon
            fontSize="small"
            style={{ color: "white", marginTop: "1.5%", marginRight: "3.5%" }}
          />
          <div>
            <h3>Save upto 75% on Travel Cost</h3>
            <p>
              sRiders save upto 75% of travel costs per month as compared to
              people who opt for cabs/auto
            </p>
          </div>
        </div>
        <div className={classes.box2}>
          <HubIcon
            fontSize="small"
            style={{ color: "white", marginTop: "1.5%", marginRight: "3.5%" }}
          />
          <div>
            <h3>Expand your Professional Network</h3>
            <p>
              Carpool with professionals from different domains and expand your
              professional network while travelling
            </p>
          </div>
        </div>
        <div className={classes.box2}>
          <ForestIcon
            fontSize="small"
            style={{ color: "white", marginTop: "1.5%", marginRight: "3.5%" }}
          />
          <div>
            <h3>Reduce Pollution & Save Environment</h3>
            <p>Carpool and reduce traffic and pollution</p>
          </div>
        </div>
      </div>
      <div>
        <LazyLoadImage
          src={whycarImg}
          width={500}
          height={500}
          alt="Image Alt"
        />
      </div>
    </div>
  );
};

export default WhyCarpool;
