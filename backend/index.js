const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const connectDb = require("./config/connectDb");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

connectDb();

// app.use(cors());
app.use(cors(), userRoute);
app.use(cors(), taskRoute);

const server = app.listen(process.env.PORT, () =>
  console.log(`server started on ${process.env.PORT} port`)
);

app.addListener("error", (err) => {
  console.log("unhandled error", err);
  server.close(() => process.exit(1));
});
