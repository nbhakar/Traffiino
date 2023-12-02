import axios from "axios";
import React, { useState } from "react";
import classes from "./PersonalInfo.module.css";
import DateOfBirth from "./update detail/DateOfBirth";
import Email from "./update detail/Email";
import Fname from "./update detail/Fname";
import Lname from "./update detail/Lname";
import MobileNum from "./update detail/MobileNum";
import PersonalBio from "./update detail/PersonalBio";

const PersonalInfo = (props) => {
  const [fname, setfname] = useState(false);
  const [lname, setlname] = useState(false);
  const [dob, setdob] = useState(false);
  const [email, setemail] = useState(false);
  const [pnum, setpnum] = useState(false);
  const [bio, setbio] = useState(false);
  const [firstname, setFirstName] = useState(props.userDetails.firstName);
  const [lastname, setLastname] = useState(props.userDetails.lastName);
  const [gender, setGender] = useState(props.userDetails.gender);
  const [dateOB, setDateOB] = useState(props.userDetails.dateOfBirth);
  const [emailval, setEmailval] = useState(props.userDetails.email);
  const [pnumValue, setPnumValue] = useState(props.userDetails.mobileNum);
  const [bioValue, setBioValue] = useState(props.userDetails.bio);
  const [postImage, setPostImage] = useState(props.userDetails.imgURL);
  const userDetails = props.userDetails;

  const saveDetailsHandler = async () => {
    try {
      const id = localStorage.getItem("token");
      window.scroll(0, 0);
      // console.log(id);
      axios
        .post("http://localhost:4000/saveDetailsById", {
          id: id,
          fname: firstname,
          lname: lastname,
          dob: dateOB,
          email: emailval,
          pnum: pnumValue,
          bio: bioValue,
          proImg: postImage,
        })
        .then((res) => {
          // setUserDetails(res.data);
          alert("successfully saved");
        })
        .catch(() => {
          console.log("userDetailsError");
        });
    } catch (error) {}
  };
  const defaultImg =
    "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720";
  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };
  return (
    <>
      {fname && (
        <Fname
          setfname={setfname}
          firstname={firstname}
          setFirstName={setFirstName}
        />
      )}
      {lname && (
        <Lname
          setlname={setlname}
          lastname={lastname}
          setLastname={setLastname}
        />
      )}
      {dob && (
        <DateOfBirth setdob={setdob} dateOB={dateOB} setDateOB={setDateOB} />
      )}
      {email && (
        <Email
          setemail={setemail}
          emailval={emailval}
          setEmailval={setEmailval}
        />
      )}
      {pnum && (
        <MobileNum
          setpnum={setpnum}
          pnumValue={pnumValue}
          setPnumValue={setPnumValue}
        />
      )}
      {bio && (
        <PersonalBio
          setbio={setbio}
          bioValue={bioValue}
          setBioValue={setBioValue}
        />
      )}
      {!fname && !lname && !dob && !email && !pnum && !bio && (
        <div className={classes.box1}>
          <div>
            <div className={classes.box3}>
              <img src={postImage || defaultImg} />
            </div>
            {/* <div className={classes.box4}>Update Photo</div> */}
            <label className={classes.box4}>
              <input
                onChange={imageUploadHandler}
                className={classes.upload}
                type="file"
              />
              <span>Update Photo</span>
            </label>
          </div>
          <button onClick={() => setfname(true)} className={classes.info1}>
            <div className={classes.info2}>First name</div>
            {firstname && <div className={classes.info3}>{firstname}</div>}
            {!firstname && <div className={classes.info3}>-</div>}
          </button>
          <button onClick={() => setlname(true)} className={classes.info1}>
            <div className={classes.info2}>Last name</div>
            {lastname && <div className={classes.info3}>{lastname}</div>}
            {!lastname && <div className={classes.info3}>-</div>}
          </button>
          <div className={classes.info1not}>
            <div className={classes.info2}>Gender</div>
            <div className={classes.info3invalid}>{gender}</div>
          </div>
          <button onClick={() => setdob(true)} className={classes.info1}>
            <div className={classes.info2}>Date of birth</div>
            {dateOB && <div className={classes.info3}>{dateOB}</div>}
            {!dateOB && <div className={classes.info3}>-</div>}
          </button>
          <button onClick={() => setemail(true)} className={classes.info1}>
            <div className={classes.info2}>Email</div>
            {emailval && <div className={classes.info3}>{emailval}</div>}
            {!emailval && <div className={classes.info3}>-</div>}
          </button>
          <button onClick={() => setpnum(true)} className={classes.info1}>
            <div className={classes.info2}>Mobile phone</div>
            {pnumValue && <div className={classes.info3}>{pnumValue}</div>}
            {!pnumValue && <div className={classes.info3}>-</div>}
          </button>
          <div className={classes.line} />
          <button onClick={() => setbio(true)} className={classes.info1}>
            <div className={classes.info2}>Bio</div>
            {bioValue && <div className={classes.info3}>{bioValue}</div>}
            {!bioValue && <div className={classes.info3}>-</div>}
          </button>
          {/* <div className={classes.line} /> */}
          <div className={classes.save}>
            <button onClick={saveDetailsHandler} className={classes.saveBtn}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInfo;

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
