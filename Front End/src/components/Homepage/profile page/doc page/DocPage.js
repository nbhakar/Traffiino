import React, { useEffect, useState } from "react";
import classes from "./DocPage.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";

const DocPage = () => {
  const [isverified, setisverified] = useState(true);
  const [doctype, setdoctype] = useState();
  const [formValidity, setformValidity] = useState(false);
  const [govtid, setGovtid] = useState({ url: "", name: "" });
  const [dl, setDl] = useState({ url: "", name: "" });
  const [insurnace, setInsurnace] = useState({ url: "", name: "" });

  useEffect(() => {
    getUserDocs();
  }, []);

  const getUserDocs = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("http://localhost:4000/getDocuments", {
        id: token,
      });
      console.log(data);
      console.log(data.Status);
      setformValidity(data.Status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setdoctype(event.target.value);
  };
  const govtidHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setGovtid({ ...govtid, url: base64, name: file.name });
  };
  const dlHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setDl({ ...dl, url: base64, name: file.name });
    console.log(govtid);
  };
  const insuranceHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setInsurnace({ ...insurnace, url: base64, name: file.name });
  };

  const saveDetailsHandler = async () => {
    let doct;
    if (doctype === 10) doct = "Aadhar Car";
    else if (doctype === 20) doct = "Pan card";
    else doct = "Passport";
    axios
      .post("http://localhost:4000/saveUserDocs", {
        id: localStorage.getItem("token"),
        doct: doct,
        govt: govtid.url,
        dl: dl.url,
        insurance: insurnace.url,
      })
      .then((res) => {
        alert("successfully saved");
        setGovtid({ url: "", name: "" });
        setDl({ url: "", name: "" });
        setInsurnace({ url: "", name: "" });
        window.location.reload();
      })
      .error((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      {formValidity === "verified" && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "4rem",
              color: "#27ae60",
              marginBottom: "2rem",
            }}
          >
            Hurrayyyy!!!
          </h1>
          <h3>
            You have been verified <VerifiedIcon style={{ color: "#1976D2" }} />
          </h3>
        </div>
      )}
      {formValidity !== "verified" && (
        <div className={classes.box1}>
          {formValidity === "pending" && (
            <p className={classes.alert}>Document Verification is in process</p>
          )}
          <div className={classes.box2}>
            <div>Goverment Id</div>
            <div className={classes.box3}>
              {formValidity === "incomplete" && (
                <>
                  <div className={classes.box4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Document Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={doctype}
                        label="Document Type"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Aadhar Car</MenuItem>
                        <MenuItem value={20}>Pan card</MenuItem>
                        <MenuItem value={30}>Passport</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <label className={classes.uploadlabel}>
                    <input
                      onChange={govtidHandler}
                      className={classes.upload}
                      type="file"
                    />
                    <span>
                      <UploadIcon /> Upload
                    </span>
                  </label>
                  {govtid && (
                    <div className={classes.filename}>{govtid.name}</div>
                  )}
                </>
              )}
              {formValidity === "pending" && (
                <span>
                  Verification pending <AccessTimeIcon />
                </span>
              )}
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.box2}>
            <div>Driving Licence</div>
            <div className={classes.box3}>
              {formValidity === "incomplete" && (
                <>
                  <label className={classes.uploadlabel}>
                    <input
                      onChange={dlHandler}
                      className={classes.upload}
                      type="file"
                    />
                    <span>
                      <UploadIcon /> Upload
                    </span>
                  </label>
                  {dl && <div className={classes.filename}>{dl.name}</div>}
                </>
              )}
              {formValidity === "pending" && (
                <span>
                  Verification pending <AccessTimeIcon />
                </span>
              )}
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.box2}>
            <div>Insurance Paper</div>
            <div className={classes.box3}>
              {formValidity === "incomplete" && (
                <>
                  <label className={classes.uploadlabel}>
                    <input
                      onChange={insuranceHandler}
                      className={classes.upload}
                      type="file"
                    />
                    <span>
                      <UploadIcon /> Upload
                    </span>
                  </label>
                  {insurnace && (
                    <div className={classes.filename}>{insurnace.name}</div>
                  )}
                </>
              )}
              {formValidity === "pending" && (
                <span>
                  Verification pending <AccessTimeIcon />
                </span>
              )}
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.save}>
            {formValidity !== "pending" && (
              <button onClick={saveDetailsHandler} className={classes.saveBtn}>
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DocPage;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
