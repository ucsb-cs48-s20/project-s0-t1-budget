import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware); //here the handler will be using our database from mongoDB

handler.get(async (req, res) => {
  let doc = await req.db.collection("database").findOne(); //Getting all the data in the database
  console.log(doc);
  res.json(doc);
});

export default handler;

/* Code from the lab, not sure if we need admin yet

async function createAdmin(req) {
    const {email} = req.body

    if (!email) {
        throw {
            status: 400,
            message: "Missing email",
        };
    }

    const client = await initDatabase();
    const users = client.collection("database")

    const query = {
        email,
    };

    const mutation = {
        $setOnInsert: {
            email,
        },
        $set: {
            role: "admin",
        },
    };

    const result = await users.findOneAndUpdate(query, mutation, {
        upsert: true,
        returnOriginal: false,
    });

    return result.value;
}
    
async function performAction(req, user) {
    if (user.role !== "admin") {
        throw { status: 403 }; //403 tells forbidden
    }

    switch (req.method) {

        case "GET":
            return getAdmins();
        case "POST":
            return createAdmin(req);
    } 
    throw { status: 405 }; //405 - method not allow different than not found
}

export default authenticatedAction(performAction); //Alows the user to do action that only they can do
*/
