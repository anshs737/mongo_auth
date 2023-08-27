const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignupTutorial")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log("failed to connect:", e);
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("LogIncollection", loginSchema);

module.exports = collection; // Fixed the comment by adding a dot after "collection"
