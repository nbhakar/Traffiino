import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Create from "../../pages/create n find ride/Create";
import FindRide from "../../pages/create n find ride/FindRide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classes from "./PublishRide.module.css";
import Map from "../map/Map";
import RideResult from "../ride res/RideResult";
import Bookride from "../booking/Bookride";

const PublishRide = () => {
  const [offer, setOffer] = useState(true);
  const [publish, setPublish] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [pin1, setPin1] = useState();
  const [pin2, setPin2] = useState();
  const [showDetail, setShowDetail] = useState();
  const history = useHistory();

  const publishHandler = () => {
    setOffer(false);
    setPublish(true);
  };
  const offerHandler = () => {
    setOffer(true);
    setPublish(false);
  };

  const backBtnHandler = () => {
    if (searchResult) {
      setSearchResult();
      setShowDetail(null);
      setPin1();
      setPin2();
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // console.log(showDetail);
  }, []);
  return (
    <div className={classes.box0}>
      <div className={classes.bgmap}>
        <Link onClick={backBtnHandler}>
          <button className={classes.back}>
            <ArrowBackIcon></ArrowBackIcon> {searchResult ? "Back" : "Home"}
          </button>
        </Link>
        {!searchResult && (
          <>
            <div className={classes.btngrp}>
              <button
                className={classes.tabsoffer}
                style={{
                  color: `${offer ? "white" : "gray"}`,
                  backgroundColor: `${offer ? "#27ae60" : "white"}`,
                }}
                onClick={offerHandler}
              >
                {" "}
                offer
              </button>
              <button
                style={{
                  color: `${publish ? "white" : "gray"}`,
                  backgroundColor: `${publish ? "#27ae60" : "white"}`,
                }}
                className={classes.tabsfind}
                onClick={publishHandler}
              >
                {" "}
                Find
              </button>
            </div>
            {offer && (
              <Create
                pin1={pin1}
                pin2={pin2}
                setPin1={setPin1}
                setPin2={setPin2}
              />
            )}
            {publish && (
              <FindRide
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                setPin1={setPin1}
                setPin2={setPin2}
              />
            )}
          </>
        )}
        {searchResult && (
          <RideResult
            setPin1={setPin1}
            setPin2={setPin2}
            rideData={searchResult}
            setShowDetail={setShowDetail}
          />
        )}
      </div>
      {showDetail && (
        <Bookride setShowDetail={setShowDetail} data={showDetail} />
      )}
      {!showDetail && <Map pin1={pin1} pin2={pin2} />}
    </div>
  );
};

export default PublishRide;
