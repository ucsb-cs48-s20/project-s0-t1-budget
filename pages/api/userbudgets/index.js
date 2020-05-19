import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware); //here the handler will be using our database from mongoDB

//Handing the GET method - this method will be getting you everything inside the database
handler.get(async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const userBudget = await req.db.collection("database").find().toArray(); //Finding everything inside the database
        res.status(200).json({ success: true, data: userBudget });
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

//Handling the POST method
/* In order to data into the database follow the JSON format below:
Year and Month have to be integer
{
  "email": "trungbui@ucsb.edu",
  "month": 12,
  "year": 2000,
  "labels": [
      "Net Income",
      "Income",
      "Grocery",
      "Furniture"
  ],
  "data": [
      "5500",
      "1000",
      "500",
      "400"
  ]
} */

handler.post(async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const userBudget = await req.db
          .collection("database")
          .insertOne(req.body); //Adding whatever is inside req body into the database
        res.status(201).json({ success: true, data: userBudget });
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
