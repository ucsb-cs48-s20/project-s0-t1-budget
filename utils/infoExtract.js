function throwError(message) {
  throw new Error(message);
}

export function infoExtract(id) {
  typeof id === "string" || throwError("endpoint should be of type string");

  id.length >= 7 ||
    throwError("id should not be empty or less than 7 characters");
  const userEmail = id.toString().substring(0, id.toString().length - 6);
  var userMonth = id
    .toString()
    .substring(id.toString().length - 6, id.toString().length - 4);
  const userYear = parseInt(
    id.toString().substring(id.toString().length - 4, id.toString().length)
  );

  //In the case that the month is single digit, an if statement to clean out the zero and just return the number
  var isZero = false;
  if (userMonth.substring(0, 1) == "0") {
    userMonth = userMonth.substring(1, 2);
    isZero = true;
  }
  userMonth = parseInt(userMonth);

  var extractedOutput = "";
  if (isZero == true) {
    extractedOutput =
      userEmail + "0" + userMonth.toString() + userYear.toString();
  } else {
    extractedOutput = userEmail + userMonth.toString() + userYear.toString();
  }
  return extractedOutput;
}
