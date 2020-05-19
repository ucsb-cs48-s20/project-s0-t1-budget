import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const { ObjectId } = require("mongodb");
const Archetype = require("archetype-js"); //Handler conversion to MongoDB ObjectIds
const handler = nextConnect();

handler.use(middleware); //here the handler will be using our database from mongoDB

handler.get(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const budget = await req.db
          .collection("database")
          .find({ _id: Archetype.to(id, ObjectId) }); //Finding the budget by the id specified at the end points
        console.log(stringify(budget));
        //What if the budget does not exist??
        if (!budget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true });
        //, data: JSON.stringify(budget) });
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

  switch (method) {
    case "PUT":
      try {
        const budget = await req.db
          .collection("database")
          .findOneAndUpdate({ _id: Archetype.to(id, ObjectId) }, req.body);

        //What if the budget does not exist??
        if (!budget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: budget });
      } catch (error) {
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
