import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import classes from "./AccInfo.module.css";
import ChangePass from "./change pass/ChangePass";
import PostalAdd from "./postal add/PostalAdd";
import BankDetail from "./bank detail/BankDetail";

const AccInfo = (props) => {
  const [changepass, setchangepass] = useState(false);
  const [postal, setpostal] = useState(false);
  const [bankdetail, setBankdetail] = useState(false);
  return (
    <>
      {changepass && <ChangePass setchangepass={setchangepass} />}
      {postal && <PostalAdd setpostal={setpostal} />}
      {bankdetail && <BankDetail setBankdetail={setBankdetail} />}
      {!changepass && !postal && (
        <div className={classes.box1}>
          <div className={classes.info1not}>
            <div className={classes.info2}>Current Rating</div>
            <div className={classes.info3}>
              <StarBorderIcon /> {props.userDetails.rating}
            </div>
          </div>
          <button onClick={() => setchangepass(true)} className={classes.info1}>
            <div className={classes.info2}>
              Change Password <NavigateNextIcon />
            </div>
          </button>
          <button onClick={() => setpostal(true)} className={classes.info1}>
            <div className={classes.info2}>
              Postal Address <NavigateNextIcon />
            </div>
          </button>
          <button onClick={() => setBankdetail(true)} className={classes.info1}>
            <div className={classes.info2}>
              Bank Details <NavigateNextIcon />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default AccInfo;
