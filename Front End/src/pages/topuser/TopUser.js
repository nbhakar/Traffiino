import React from "react";
import classes from "./TopUser.module.css";
import Card from "../../UI/Card/Card";

const topUsers = [
  {
    key: 1,
    title: "Rahul Hinduja",
    Description: "He is based out of pune, loves driving",
    rating: 4.7,
    img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    key: 2,
    title: "Kelly Sharma",
    Description: "She is based out of delhi, loves driving",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    key: 3,
    title: "Joseph Murinio",
    Description: "based out of hyderabad, loves driving",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

const TopUser = () => {
  return (
    <>
      <h1 className={classes.title}>Testimonials</h1>
      <div className={classes.wrapper}>
        {topUsers.map((c) => (
          <Card
            key={c.key}
            rating={c.rating}
            title={c.title}
            desc={c.Description}
            img={c.img}
          />
          // console.log("helo");
        ))}
      </div>
    </>
  );
};

export default TopUser;
