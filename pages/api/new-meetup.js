// './api/new-meetup'
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // Process only 'POST' requests
  if (req.method === "POST") {
    // TODO
    const data = req.body;
    // const { title, description, address, image } = data;
    const client = await MongoClient.connect(process.env.MONGO_URI);

    // Get hold of that database to which we're connecting here.
    const ourDb = client.db();

    const meetupcollections = ourDb.collection("meetups");

    // Insert one entry/document~row in this collection~table
    // Result will be an object with, for example, the automatically generated ID.
    const result = await meetupcollections.insertOne(data);
    // result->{insertId:--}
    // Close the connection after posting the meetup data.
    client.close();

    // 201 status code to indicate that something was inserted successfully.
    res.status(201).json({
      message: "Meetup inserted!",
      result: result,
    });
  }
}
