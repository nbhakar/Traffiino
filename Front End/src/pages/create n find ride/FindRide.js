import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import classes from "./Create.module.css";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import NumInp from "../../components/numberinput/NumInp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useEffect } from "react";

const nominatim_base_url = "https://nominatim.openstreetmap.org/search?";

const FindRide = (props) => {
  const [value, setValue] = useState(new Date("2017-05-24"));
  const [searchtext, setSearchtext] = useState("");
  const [searchtext1, setSearchtext1] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [listPlace1, setListPlace1] = useState([]);
  const [userData, setuserData] = useState();
  const [formValidity, setFormValidity] = useState(true);
  const city = useRef();
  const scity = useRef();
  const ecity = useRef();
  const fCheckRef = useRef();

  const userDetailFetch = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "http://localhost:4000/getUserDetailById",
      { id: token }
    );
    console.log(data);
    setuserData(data);
  };

  useEffect(() => {
    userDetailFetch();
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
    setTimeout(() => {
      setListPlace1([]);
    }, 800);
  };

  const searchRideHandler = async () => {
    var tcity = city.current.value;
    tcity = tcity.toLowerCase();
    const tdate = value;
    let female;
    if (fCheckRef.current) {
      female = fCheckRef.current.checked;
    }

    if (!tcity.length) {
      city.current.focus();
      setFormValidity(false);
      // console.log("here");
      return;
    }
    if (!tdate.length) {
      setFormValidity(false);
      // console.log("here");
      return;
    }

    axios
      .post("http://localhost:4000/searchRides", {
        scity: tcity,
        datee: tdate,
        female,
        id: localStorage.getItem("token"),
      })
      .then(async (res) => {
        // console.log(res.data);
        if (female) {
          const fres = [];
          const len = res.data.length;
          const docs = res.data;

          for (let i = 0; i < len; i++) {
            const token = docs[i].driverId;
            const res = await axios.post(
              "http://localhost:4000/getUserDetailById",
              { id: token }
            );
            if (res.data.gender === "female") {
              console.log(res.data);
              fres.push(docs[i]);
            }
          }
          console.log(fres);
          props.setSearchResult(fres);
        } else {
          props.setSearchResult(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // let history = useHistory();
  return (
    <div className={classes.outerBox}>
      <div className={classes.innerBox}>
        <h1 style={{ fontWeight: "bold" }}>Find Ride</h1>
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
            onChange={(date) => {
              setValue(date.target.value);
              // console.log(value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <NumInp /> */}
        </div>
        {userData?.gender === "female" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                marginLeft: "10px",
                color: "#fa2cf1",
                fontWeight: "bold",
              }}
            >
              She Driver
            </span>
            <input
              ref={fCheckRef}
              style={{ marginLeft: "5px", border: "1px solid #fa2cf1" }}
              type="checkbox"
            />
          </div>
        )}
        {!formValidity && (
          <div className={classes.invalid}>
            <span className={classes.invalidText}>INVALID INPUT</span>
          </div>
        )}
        <button onClick={searchRideHandler} className={classes.btn}>
          Find Ride.
        </button>
      </div>
    </div>
  );
};

export default FindRide;
