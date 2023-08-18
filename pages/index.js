import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// All this code will execute whenever this page is pre-generated, during the build process,
export async function getStaticProps() {
  // Get the meetups data from the database
  const client = await MongoClient.connect(process.env.MONGO_URI);

  // connect to the db
  const ourDb = client.db();

  // Get meetups collection
  const meetupcollections = ourDb.collection("meetups");

  // Find all the documents in that collection.
  const meetups = await meetupcollections.find().toArray();
  // Close the connection after getting the required data.
  client.close();

  // Transform the meetup objects
  const transformedMeetups = meetups.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
    };
  });
  return {
    props: { meetups: transformedMeetups },
    revalidate: 1,
  };
}

export default HomePage;
