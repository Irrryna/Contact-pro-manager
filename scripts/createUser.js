const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

mongoose.connect("mongodb://localhost:27017/contact-pro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createUser() {
  const hashedPassword = await bcrypt.hash("test1234", 10);

  const user = new User({
    firstName: "Irina",
    lastName: "K",
    email: "irina@test.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("✅ Utilisateur créé !");
  mongoose.disconnect();
}

createUser();

