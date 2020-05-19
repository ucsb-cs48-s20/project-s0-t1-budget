import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

//A middleware page that allows more flexibility to access the database and use it
//Link that I used to know more: https://developer.mongodb.com/how-to/nextjs-building-modern-applications
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Connecting to MongoDB database and we are using our database name which is database
async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("database"); //The name of our database is called database so that is what we are connecting to
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
