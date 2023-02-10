const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
const path = require("path");

app.use(express.json());
const userRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionRoute");

app.use("/api/users/", userRoute);
app.use("/api/transactions", transactionsRoute);
// const port = 6000;
const port = process.env.PORT || 6000;
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
app.listen(port, () => console.log(`Node JS Server Started at port ${port} !`));
