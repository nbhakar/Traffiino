import { Button, Paper } from "@mui/material";
import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import Carousel from "react-material-ui-carousel";
import classes from "./CarouselComp.module.css";

const CarouselComp = () => {
  var items = [
    {
      name: "Joseph Taco",
      description:
        "I had no idea about carpooling untill I knew about Quickride. It's doing so so good and has helped me a lot with saving a lot money",
      img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Neelam Chouhan",
      description:
        "Made life easy. No more waiting for cabs and buses. Great app to get to know people from the same organization. Keep rocking 😀",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Sujay Kamath",
      description:
        "Quickride has been a boon to so many and likewise for me as I can travel to office daily making friends and networking",
      img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
  ];

  return (
    <>
      <h1 className={classes.title}>Testimonials</h1>
      <Carousel height="22rem">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
};
function Item(props) {
  return (
    <div className={classes.box1}>
      <div className={classes.box2}>
        <img className="d-block w-100" src={props.item.img} alt="Loading" />
      </div>
      <div className={classes.box3}>
        <p>
          <MDBIcon fas icon="quote-left" /> {props.item.description}{" "}
          <MDBIcon fas icon="quote-right" />
        </p>
        <h2>{props.item.name}</h2>
      </div>

      {/* <Button className="CheckButton">Check it out!</Button> */}
    </div>
  );
}

export default CarouselComp;
