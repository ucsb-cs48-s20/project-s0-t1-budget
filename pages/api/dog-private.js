import { fetch } from "../../utils/fetch";
import auth0 from "../../utils/auth0";

export default auth0.requireAuthentication(async function (req, res) {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      image: response.message,
    })
  );
});
