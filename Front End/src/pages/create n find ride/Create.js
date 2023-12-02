import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import classes from "./Create.module.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import NumInp from "../../components/numberinput/NumInp";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

const nominatim_base_url = "https://nominatim.openstreetmap.org/search?";

const Create = (props) => {
  const [date, setDate] = useState(new Date("2017-05-24"));
  const [stime, setSTime] = useState(new Date("00:00"));
  const [etime, setETime] = useState(new Date("00:00"));
  const [searchtext, setSearchtext] = useState("");
  const [searchtext1, setSearchtext1] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [listPlace1, setListPlace1] = useState([]);
  const [formValidaity, setFormValidaity] = useState(true);
  const city = useRef();
  const seat = useRef();
  const scity = useRef();
  const ecity = useRef();
  const datee = useRef();
  const timee = useRef();

  useEffect(() => {
    if (searchtext.length > 3) {
      const params = {
        q: searchtext,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${nominatim_base_url}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setListPlace(JSON.parse(result));
        })
        .catch((err) => {});
    } else {
      setListPlace([]);
    }
  }, [searchtext]);

  const addRideHandler = async (event) => {
    event.preventDefault();
    // console.log(date);
    const start = searchtext;
    const end = searchtext1;
    var cityy = city.current.value;
    cityy = cityy.toLowerCase();
    const seaat = seat.current.value;
    const ddate = date;
    const sttime = stime;
    const ettime = etime;

    const pin1 = [props.pin1.lat, props.pin1.lon];
    const pin2 = [props.pin2.lat, props.pin2.lon];
    const id = localStorage.getItem("token");
    console.log(pin1, pin2);

    if (start.length < 3) {
      setFormValidaity(false);
      scity.current.focus();
      return;
    }
    if (city.length < 3) {
      setFormValidaity(false);
      city.current.focus();
      return;
    }
    if (end.length < 3) {
      setFormValidaity(false);
      ecity.current.focus();
      return;
    }
    if (date.length < 1) {
      setFormValidaity(false);
      datee.current.focus();
      return;
    }
    if (sttime.length < 1) {
      setFormValidaity(false);
      return;
    }
    if (ettime.length < 1) {
      setFormValidaity(false);
      return;
    }
    if (seaat.length < 1) {
      setFormValidaity(false);
      seat.current.focus();
      return;
    }

    axios
      .post("http://localhost:4000/addRide", {
        sloc: start,
        slocPoint: pin1,
        scity: cityy,
        eloc: end,
        elocPoint: pin2,
        ddate: ddate,
        sttime: sttime,
        ettime: ettime,
        sseats: seaat,
        ddriverId: id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("nhk");
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchtext1.length > 3) {
      const params = {
        q: searchtext1,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${nominatim_base_url}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setListPlace1(JSON.parse(result));
        })
        .catch((err) => {});
    } else {
      setListPlace1([]);
    }
  }, [searchtext1]);

  const addPlaceHandler = (place) => {
    setSearchtext(place.display_name);
    props.setPin1(place);
    setTimeout(() => {
      setListPlace([]);
    }, 800);
  };
  const addPlaceHandler1 = (place) => {
    setSearchtext1(place.display_name);
    props.setPin2(place);
    // console.log(place);
    setTimeout(() => {
      setListPlace1([]);
    }, 800);
  };
  let history = useHistory();
  return (
    <div className={classes.outerBox}>
      <div className={classes.innerBox}>
        <h1 style={{ fontWeight: "bold" }}>Offer Ride</h1>
        <div className={classes.wrapper}>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ margin: "10px 10px" }}
              id="filled-basic"
              label="Start Location"
              variant="outlined"
              value={searchtext}
              ref={scity}
              onChange={(event) => setSearchtext(event.target.value)}
            />
            <TextField
              style={{ margin: "10px 10px" }}
              id="filled-basic"
              label="Start city"
              variant="outlined"
              inputRef={city}
            />
            <List
              style={{ position: "absolute", top: "9rem" }}
              className={classes.listitems}
            >
              {listPlace &&
                listPlace.map((item) => {
                  return (
                    <div
                      key={item?.osm_id}
                      onClick={() => addPlaceHandler(item)}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={item?.display_name} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </List>
          </div>
          <div>
            <TextField
              style={{ margin: "10px 10px" }}
              id="filled-basic"
              label="End Location"
              variant="outlined"
              ref={ecity}
              value={searchtext1}
              onChange={(event) => setSearchtext1(event.target.value)}
            />
            <List
              style={{ position: "absolute" }}
              className={classes.listitems}
            >
              {listPlace1 &&
                listPlace1.map((item) => {
                  return (
                    <div
                      key={item?.osm_id}
                      onClick={() => addPlaceHandler1(item)}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={item?.display_name} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </List>
          </div>
        </div>
        <div className={classes.timedate}>
          <TextField
            id="date"
            type="date"
            onChange={(datey) => {
              // console.log(date.target.value);
              setDate(datey.target.value);
              console.log(date);
            }}
            ref={datee}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.timingBox}>
            <div className={classes.outerTimeBox}>
              <p>Start time</p>
              <TextField
                id="time"
                type="time"
                // ref={stimee}
                onChange={(time) => {
                  setSTime(time.target.value);
                  // console.log(value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.outerTimeBox}>
              <p>End time</p>
              <TextField
                id="time"
                type="time"
                // ref={timee}
                onChange={(time) => {
                  setETime(time.target.value);
                  // console.log(value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div>
            <div className={classes.outer}>
              <PersonIcon />
              <input className={classes.inputnum} type={"number"} ref={seat} />
            </div>
          </div>
        </div>
        {!formValidaity && (
          <div className={classes.invalid}>
            <span className={classes.invalidText}>INVALID INPUT</span>
          </div>
        )}
        <button onClick={addRideHandler} className={classes.btn}>
          Offer Ride.
        </button>
      </div>
    </div>
  );
};

export default Create;
