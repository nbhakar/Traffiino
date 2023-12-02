import axios from "axios";
import React, { useEffect, useState } from "react";
import RideResult from "../../ride res/RideResult";
import classes from "./MyRides.module.css";
import Navbar from "../../Navbar/Navbar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyRidesList from "./MyRidesList";
import Map from "../../map/Map";
import geoLoc from "../../../hooks/UseGeoLocation";
import { Link, useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../../UI/loader/Loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyRides = () => {
  const token = localStorage.getItem("token");
  const [allRides, setAllRides] = useState([]);
  const [value, setValue] = React.useState(0);
  const [allOfferings, setAllOfferings] = useState();
  const [location, setlocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x1: "",
    y1: "",
    liveLoc: {},
  });
  const [liveCoordinates, setLiveCoordinates] = useState({ lon: "", lat: "" });

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.watchPosition((locn) => {
        if (locn)
          setLiveCoordinates({
            lon: locn.coords.longitude,
            lat: locn.coords.latitude,
          });
        if (location) {
          updateLiveLocation();
        }
      });
    }
  }, []);

  const updateLiveLocation = async () => {
    await axios.post("http://localhost:4000/updateLiveLocation", {
      id: token,
      coordinates: liveCoordinates,
    });
  };
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const onLoadHandler = async () => {
    setIsLoading(true);
    const res = await axios.post("http://localhost:4000/getAllRiderRides", {
      id: token,
    });
    let allData = [];
    const docs = res.data;

    for (let i = 0; i < docs.length; i++) {
      // console.log(docs[i]);
      const res = await axios.post("http://localhost:4000/getAllRides", {
        id: docs[i],
      });
      // console.log(res.data[0]);
      if (res.data[0].driverId != token) allData.push(res.data[0]);
      // console.log("");
    }
    setAllRides(allData);
    console.log(allRides);

    const { data } = await axios.post(
      "http://localhost:4000/getRideDetailById",
      {
        id: token,
      }
    );
    setIsLoading(false);
    setAllOfferings(data);
  };

  const closeHandler = () => {
    setlocation(false);
  };

  useEffect(() => {
    onLoadHandler();
  }, []);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {!isLoading && (
        <>
          {location && (
            <div className={classes.closeBox}>
              <button onClick={closeHandler} className={classes.close}>
                Close <CloseIcon fontSize="large" />
              </button>
            </div>
          )}
          {!location && <Navbar />}
          {/* {allRides.length > 0 &&
        allRides.forEach((e) => {
          console.log(e);
          <h1>{e.eLoc}</h1>;
        })} */}
          {/* <div className={classes.resBox}>
        {allRides &&
          allRides.map((e) => (
            <MyRidesList
            key={e._id}
            id={e.driverId}
            data={e}
              startLocation={e.sLoc}
              startTime={e.stime}
              endLocation={e.eLoc}
              endTime={e.etime}
              seatsLeft={e.seats}
              />
              ))}
            </div> */}
          {/* <RideResult rideData={allRides} /> */}
          {location && (
            <Map
              pin1={coordinates.liveLoc}
              icon="live"
              pin2={{ lon: coordinates.x1, lat: coordinates.y1 }}
            />
          )}
          {!location && (
            <div className={classes.ridesBox}>
              <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  // textColor="primar"
                  // indicatorColor="success"
                  aria-label="basic tabs example"
                >
                  <Tab
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    label="Offered"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    label="Accepted"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className={classes.resBox}>
                  {allOfferings &&
                    allOfferings.length > 0 &&
                    allOfferings.map((e) => (
                      <MyRidesList
                        key={e._id}
                        type="driver"
                        setCoordinates={setCoordinates}
                        setlocation={setlocation}
                        id={e.driverId}
                        data={e}
                        startLocation={e.sLoc}
                        startTime={e.stime}
                        endLocation={e.eLoc}
                        endTime={e.etime}
                        seatsLeft={e.seats}
                      />
                    ))}
                  {/* {!allOfferings && <h1>Oops</h1>} */}
                  {allOfferings && allOfferings.length === 0 && (
                    <>
                      <h1
                        style={{
                          marginBottom: "1rem",
                          color: "#1e8449",
                        }}
                      >
                        Oops, you haven't been to any ride!!
                      </h1>
                      <h4>
                        <Link to="/ridesurf">Click here</Link> to Offer/Find
                        rides{" "}
                      </h4>
                    </>
                  )}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className={classes.resBox}>
                  {allRides &&
                    allRides.map((e) => (
                      <MyRidesList
                        key={e._id}
                        type="rider"
                        setCoordinates={setCoordinates}
                        setlocation={setlocation}
                        id={e.driverId}
                        data={e}
                        startLocation={e.sLoc}
                        startTime={e.stime}
                        endLocation={e.eLoc}
                        endTime={e.etime}
                        seatsLeft={e.seats}
                      />
                    ))}
                  {allRides && allRides.length === 0 && (
                    <>
                      <h1
                        style={{
                          marginBottom: "1rem",
                          color: "#1e8449",
                        }}
                      >
                        Oops, you haven't been to any ride!!
                      </h1>
                      <h4>
                        <Link to="/ridesurf">Click here</Link> to Offer/Find
                        rides{" "}
                      </h4>
                    </>
                  )}
                </div>
              </TabPanel>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyRides;
