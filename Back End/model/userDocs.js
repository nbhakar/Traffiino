const mongoose = require("mongoose"); //.set('debug', true);
const Schema = mongoose.Schema;

const userDocSchema = new Schema({
  userId: Schema.ObjectId,
  govtId: [String],
  DL: String,
  Insurance: String,
  Status: String,
});

const UserDoc = mongoose.model("UserDoc", userDocSchema);

module.exports = UserDoc;
