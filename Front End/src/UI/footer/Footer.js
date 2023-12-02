import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgb(39,174,96)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Traffiino.com
        </a>
      </div>
    </MDBFooter>
  );
}
