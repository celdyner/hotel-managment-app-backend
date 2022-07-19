const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 8080 || process.env.PORT;
const userRoutes = require("./routes/hotel");
const errorHandler = require("./controllers/error")


app.use(bodyParser.json());
app.use( userRoutes);

app.use((req, res, next) => {
  let error = new Error("URL Not Found");
  error.status = 404;
  next(error);
});

app.use(errorHandler);



mongoose
  .connect("mongodb://localhost/hotelmanagementapi")
  .then(() => {
    app.listen(PORT, () => console.log("SERVER IS RUNNING"));
  })
  .catch((error) => console.log(error));
