import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import budgetSchema from "../../../models/budgetSchema";

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
          .find({ _id: id.toString() }); //Finding the budget by the id specified at the end points

        //What if the budget does not exist??
        if (!budget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: budget });
      } catch (error) {
        console.log(error); // showing what the error is
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const budget = await req.db
          .collection("database")
          .findOneAndUpdate({ _id: id.toString }, req.body);

        //What if the budget does not exist??
        if (!budget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: budget });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE": //Deleting the budget from out schema
      try {
        const deletedBudget = await req.db
          .collection("database")
          .deleteOne({ _id: id }); //Method to delete a budget in the database looking by id
        console.log(deletedBudget.deleteCount);
        //What happen if there is no budget to delete??
        if (!deletedBudget) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});

export default handler;
