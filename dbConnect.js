const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ibucksss:cqVXdqxirmd3VWOP@pocketpal.hw7tlos.mongodb.net/pocketpal",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));
connection.on("connected", () => console.log("Mongo DB Connection Successful"));
