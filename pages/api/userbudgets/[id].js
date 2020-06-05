import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { getUserSession } from "../../../utils/ssr";

/* The purpose of this file is to modify data in the database
http://localhost:3000/api/userbudgets/trungbui@ucsb.edu102020
Here:
Email : trungbui@ucsb.edu (string)
Month: 10 (integer)
Year: 2020 (integer)

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
  const user = await getUserSession(req);
  // console.log("user=", JSON.stringify(user)); - Check user attributes
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
        // USER-VERIFICATION-CODE: user.email vs userEmail, if they don't match return json code 403
        if (!user.email || user.email !== userEmail) {
          return res.status(403).json({ success: false });
        }

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
  const user = await getUserSession(req);
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
          return res.status(400).json({ success: false });
        }
        /*Don't know what to pass in? Check out https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
          to find apporpriate update parameter to pass into the data

        Format to pass into the request body function, $set, $inc all works
        {
          "$set": {"month" : 200}
        } */

        //Checking the length of the id to make sure it is appropriately long
        if (id.toString().length <= 10) {
          //maybe the query is wrong
          console.log("query is too short maybing missing something");
          return res.status(400).json({ success: false });
        }

        //Extracting the info from the string, we are searching by id, month and year
        const userEmail = id.toString().substring(0, id.toString().length - 6);
        // USER-VERIFICATION-CODE: user.email vs userEmail, if they don't match return json code 403
        if (user.email == null || user.email !== userEmail) {
          return res.status(403).json({ success: false });
        }
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

        const budget = await req.db.collection("database").updateOne(
          { email: userEmail, month: userMonth, year: userYear },

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
  const user = await getUserSession(req);
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE": //Deleting the budget from out schema
      try {
        //Making sure the string passed in is of appropriate length
        if (id.toString().length <= 10) {
          //maybe the query is wrong
          console.log("query is too short maybing missing something");
          return res.status(400).json({ success: false });
        }

        //Extracting the info from the string, we are searching by id, month and year
        const userEmail = id.toString().substring(0, id.toString().length - 6);
        // USER-VERIFICATION-CODE: user.email vs userEmail, if they don't match return json code 403
        if (user.email !== userEmail) {
          return res.status(403).json({ success: false });
        }
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

        //Link for deleteOne ref: https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
        const deletedBudget = await req.db
          .collection("database")
          .deleteOne({ email: userEmail, month: userMonth, year: userYear }); // Finding and deleting the user by their email

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
