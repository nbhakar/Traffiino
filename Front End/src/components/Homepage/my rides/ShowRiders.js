import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MDBIcon } from "mdb-react-ui-kit";
import classes from "./ShowRiders.module.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

const defaultImg =
  "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";

export default function ShowRiders(props) {
  const [open, setOpen] = React.useState(true);
  const [riderInfo, setRiderInfo] = React.useState();
  const handleClose = () => {
    setOpen(false);
    props.setShowRiders(false);
  };

  const loadOnStart = async () => {
    // try {
    const driverId = props.id;
    const res = await axios.post("http://localhost:4000/getAllRides", {
      id: driverId,
    });

    const docs = res.data[0];
    console.log(docs);
    if (docs.riders) {
      let data = [];
      for (let i = 0; i < docs.riders.length; i++) {
        const riderId = docs.riders[i];
        const res = await axios.post(
          "http://localhost:4000/getUserDetailById",
          {
            id: riderId,
          }
        );
        data.push(res.data);
      }
      console.log(data);
      setRiderInfo(data);
    }
    // console.log(driverInfo, riderInfo);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  React.useEffect(() => {
    loadOnStart();
    console.log(riderInfo);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {riderInfo &&
            riderInfo.length > 0 &&
            riderInfo.map((e) => (
              <>
                <div className={classes.tripCard}>
                  <div className={classes.box1}>
                    <img
                      src={e.imgURL || defaultImg}
                      className={classes.box2}
                    />
                    <div className={classes.box3}>
                      {e.bio && (
                        <p className={classes.brp1}>
                          <MDBIcon fas icon="quote-left" /> {e.bio}
                          <MDBIcon fas icon="quote-right" />
                        </p>
                      )}
                      <h2 className={classes.brh2}>
                        {e.firstName +
                          " " +
                          e.lastName +
                          " , " +
                          calculateAge(e.dateOfBirth)}
                      </h2>
                      <p>{e.gender === "male" ? "Male" : "Female"}</p>
                    </div>

                    {/* <Button className="CheckButton">Check it out!</Button> */}
                  </div>
                </div>
              </>
            ))}
          {riderInfo && riderInfo.length === 0 && (
            <h1>No riders booked yet :/</h1>
          )}
          {!riderInfo && <h1>No riders booked yet :/</h1>}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleClose} className={classes.btn}>
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const calculateAge = (userinput) => {
  if (!userinput) return "";
  var dob = new Date(userinput);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  return age;
};
