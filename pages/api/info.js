import { authenticateRequest } from "../../utils/auth";

export default async function (req, res) {
  const response = await authenticateRequest(req);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
}
