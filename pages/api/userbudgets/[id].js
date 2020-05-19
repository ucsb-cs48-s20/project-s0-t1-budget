import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

/* The purpose of this file is to modify data in the database
http://localhost:3000/api/userbudgets/ENDPOINT
All method here will search by id and the ENDPOINT is the id here
DELETE method - delete will delete data in the database
GET method - will return the cursor to the data
PUT method - will modify the data
*/

const { ObjectId } = require("mongodb");
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

        //Extracting the info from the string, we are searching by id, month and year
        const userEmail = id.toString().substring(0, id.toString().length - 6);
        var userMonth = id
          .toString()
          .substring(id.toString().length - 6, id.toString().length - 4);
        const userYear = parseInt(
          id
            .toString()
            .substring(id.toString().length - 4, id.toString().length)
        );

        //In the case that the month is single digit, an if statement to clean out the zero and just return the number
        if (userMonth.substring(0, 1) == "0") {
          userMonth = userMonth.substring(1, 2);
        }
        userMonth = parseInt(userMonth);

        //Reference to the findOne method https://docs.mongodb.com/manual/reference/method/db.collection.findOne/#definition
        const budget = await req.db
          .collection("database")
          .findOne({ email: userEmail, month: userMonth, year: userYear }); //Finding an object by their email

        //What if the budget does not exist??
        if (!budget) {
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

handler.put(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  //Modifying the data with the PUT method - must pass in the objectID in this instance
  switch (method) {
    case "PUT":
      try {
        if (req.body == "") {
          //Nothing is passed inside the request body, WHAT ARE YOU TRYING TO UPDATE??? NOTHING?
          console.log(
            "Body request is: " +
              req.body +
              " and yes it's empty, please pass in a valid JSON string"
          );

          //Don't know what to pass in? Check out https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/ to find apporpriate update
          //parameter to pass into the data
          return res.status(400).json({ success: false });
        }

        /* Format to pass into the request body function, $set, $inc all works
        {
          "$set": {"month" : 200}
        } */
        const budget = await req.db.collection("database").updateOne(
          { _id: Archetype.to(id, ObjectId) },

          req.body,
          { upsert: true }
        );

        //What if the budget does not exist??
        if (!budget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: budget });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});

handler.delete(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE": //Deleting the budget from out schema
      try {
        //Link for deleteOne ref: https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
        const deletedBudget = await req.db
          .collection("database")
          .deleteOne({ _id: Archetype.to(id, ObjectId) }); //Using archetype to convert MongoDB object
        //What happen if there is no budget to delete??
        if (!deletedBudget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});

export default handler;
