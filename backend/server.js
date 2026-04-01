const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB");

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

app.post("/contact", async (req, res) => {
  const data = new Contact(req.body);
  await data.save();
  res.send("Saved");
});

app.listen(5000, () => console.log("Server running"));