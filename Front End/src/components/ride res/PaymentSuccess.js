import React from "react";
import { useParams } from "react-router-dom";
const PaymentSuccess = () => {
  const seachQuery = useParams();
  console.log(seachQuery);

  const referenceNum = seachQuery.get("reference");
  console.log(referenceNum);
  return (
    <div>
      <div
        h="100vh"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textTransform: "uppercase" }}> Order Successfull</h1>

        <p>Reference No.{referenceNum}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
