const mongoose = require("mongoose");

// TB- This is a schema file to help define the schema of what the user budget will look like

const budgetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Missing user email"], //required at all time, if missing then 'Missing user email' will show
    unique: true,
  },
  month: {
    type: Int64,
    required: [true, "Budget month is missing"],
  },
  year: {
    type: Int32,
    required: [true, "Budget year is missing"],
  },
  labels: {
    type: Array,
    required: [true, "There is no budget label"],
  },
  data: {
    type: Array,
    required: [true, "Missing Budget Data"],
  },
});

module.exports =
  mongoose.Model.budgetSchema || mongoose.model("Budget Schema", budgetSchema);
