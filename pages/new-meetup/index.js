import React, { useState } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  // Handle the submitting State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handler of the submitted form with a new meetup Data
  const addMeetupHandler = async (meetupData) => {
    // Set the submitting state to true.
    setIsSubmitting(true);

    // Make a 'POST' request with meetupData
    const res = await fetch("./api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    // router.replace('./') to make sure we can't go back with the back button.
    await router.push("./");

    // Reset the submitting state to false
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="Add a New Meetup"
          content="Add your own meetups and create amazing networking oppurtunities."
        />
      </Head>
      <NewMeetupForm
        onAddMeetup={addMeetupHandler}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default NewMeetupPage;
