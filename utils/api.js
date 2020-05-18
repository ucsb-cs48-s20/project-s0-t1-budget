import auth0 from "./auth0";
import { attachUserMetadata } from "./user";

//actionFn is a function that we are passing in, so basically a function passing in a function to get use
export function authenticatedAction(actionFn) {
  //auth0 is an object client that has the function requireAuthentication() <- we are passing in the paramter another function x
  // We need auth0 authentication just so that we can get a session (getSession())
  //requireAuthentication redirects you to the authentication pagevvddddd
  return auth0.requireAuthentication(async function (req, res) {
    //If anything we have done so far failed, then we would jump out the function and run the catch block
    try {
      //Then we use the getSession to extra the user object
      const { user } = await auth0.getSession(req);
      await attachUserMetadata(user);

      // Here the function passed into actionFn is getting used and actual results is
      // the object that gest passed back here
      const actionResult = await actionFn(req, user);

      res.statusCode = actionResult ? 200 : 204;
      res.end(JSON.stringify(actionResult)); // returns the respond object with what the actionResult has
    } catch (error) {
      console.error(error); //Tells the backend log what is the error
      res
        .status(error.status || 500) // Returns the error status message or 500
        .end(error.message && JSON.stringify({ message: error.message }));
    }
  });
}
