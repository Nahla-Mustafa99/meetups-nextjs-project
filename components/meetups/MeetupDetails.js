import React from "react";
import classes from "./MeetupDetails.module.css";
const MeetupDetails = ({ image, title, description, address }) => {
  // props.image , props.title...,etc.
  return (
    <section className={classes.details}>
      <img alt={title} src={image} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetails;
