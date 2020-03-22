import { authenticateRequest, getUserDetails } from "../../utils/auth";

export default async function (req, res) {
  const { token } = await authenticateRequest(req);
  const details = await getUserDetails(token);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(details));
}
