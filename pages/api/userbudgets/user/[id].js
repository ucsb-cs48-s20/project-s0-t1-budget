import nextConnect from "next-connect";
import middleware from "../../../../middleware/database";
import { useCallback } from "react";

var stringify = require("json-stringify-safe");

/* The purpose of this file is to modify data in the database
http://localhost:3000/api/userbudgets/trungbui@ucsb.edu102020
Here:
Email : trungbui@ucsb.edu (string)

this will get you everything you need to know about that user

All method here will search by the parameters specified above
DELETE method - delete will delete data in the database
GET method - will return the cursor to the data
PUT method - will modify the data
*/

const { ObjectId } = require("mongodb"); //To get MongoDB objectIDs
const Archetype = require("archetype-js"); //Handler conversion to MongoDB ObjectIds
const handler = nextConnect();

handler.use(middleware); //here the handler will be using our database from mongoDB

handler.get(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  // TB- Finding an user using their email, month and year to get the budget
  switch (method) {
    case "GET":
      try {
        if (id.toString().length <= 10) {
          //maybe the query is wrong
          console.log("query is too short maybing missing something");
          return res.status(400).json({ success: false });
        }

        //Extracting the info from the string, we are searching by id
        const userEmail = id.toString();

        //Reference to the findOne method https://docs.mongodb.com/manual/reference/method/db.collection.findOne/#definition
        const budget = await req.db
          .collection("database")
          .find({ email: userEmail })
          .toArray(); //Finding an object by their email

        //What if the budget does not exist??
        if (!budget || budget.length == 0) {
          console.log("Budget does not exist");
          return res.status(400).json({ success: false, data: budget });
        }

        //If everything succeed we return the data we got
        res.status(200).json({ success: true, data: budget });
      } catch (error) {
        console.log(error); // showing what the error is
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});

export default handler;
