import React from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const MeetupDetailPage = (props) => {
  const { meetup } = props;
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetails
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Get the meetup data from the database
  // Make a client object
  const client = await MongoClient.connect(process.env.MONGO_URI);

  const db = client.db();

  // Get meetups collection
  const meetupsCollection = db.collection("meetups");

  // Find all documents in that collection with only one field ->  _id.
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // transform the meetups array to meetup ids array with ids which is tranformed into string.
  const meetupIds = meetups.map((meetup) => meetup._id.toString());

  client.close();
  // Get all paths that should be pre-rendered
  const paths = meetupIds.map((id) => {
    return { params: { meetupId: id } };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps(context) {
  // params contains the meetup `meetupId`.
  // If the route is like /posts/1, then params.meetupId is 1
  const { params } = context;
  const meetupId = params.meetupId;

  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();
  // Get meetups collection
  const meetupsCollection = db.collection("meetups");
  // Find one document in that criteria _id === ObjectId(meetupId)
  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  const transformedMeetup = {
    id: meetup._id.toString(),
    image: meetup.image,
    title: meetup.title,
    address: meetup.address,
    description: meetup.description,
  };

  return { props: { meetup: transformedMeetup } };
}

export default MeetupDetailPage;
