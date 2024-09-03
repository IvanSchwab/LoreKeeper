const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

async function main(){
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Conectado a MongoDB")
}

main().catch(console.error)

app.use("/api/signup", require("./routes/signup"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", require("./routes/user"));
app.use("/api/refresh-token", require("./routes/refreshToken"));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
