import React, { useEffect } from "react";
import TopUser from "../../pages/topuser/TopUser";
import vimg from "../../utilites/image.jpg";
import classes from "./HomePage.module.css";
import OfferRide from "./offer ride/OfferRide";
import Footer from "./../../UI/footer/Footer";
import FaqList from "./faq/Faqlist";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WhatCarpool from "./what is carpool/WhatCarpool";
import WhyCarpool from "./why carpool/WhyCarpool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBIcon } from "mdb-react-ui-kit";
import CarouselComp from "../../UI/carousel/CarouselComp";

const HomePage = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Navbar />
      <div className={classes.wrapper}>
        <div className={classes.info}>
          <h1>CAR POOLING SERVICE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.consectetur
            adipisicing elit
          </p>
          <div className={classes.btn}>
            <button className={classes.infoBtn}>
              <MDBIcon style={{ marginRight: "5%" }} fab icon="google-play" />
              Download
            </button>
            <button className={classes.infoBtn1}>
              <MDBIcon style={{ marginRight: "5%" }} fab icon="apple" />{" "}
              Download
            </button>
          </div>
        </div>
        <div className={classes.image}>
          <LazyLoadImage src={vimg} width={600} height={400} alt="Image Alt" />
        </div>
      </div>
      <WhatCarpool />
      <OfferRide />
      <WhyCarpool />
      <CarouselComp />
      <FaqList />
    </div>
  );
};

export default HomePage;
