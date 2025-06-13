const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contact-pro");
const Contact = require("../models/contact");
const User = require("../models/user");

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/contact-pro");

// Créer un contact pour un utilisateur donné
async function createContact() {
  try {
    // On récupère l'utilisateur avec son email
    const user = await User.findOne({ email: "admin@example.com" });

    if (!user) {
      console.log("Utilisateur non trouvé !");
      return;
    }

    const contact = new Contact({
      user: user._id,
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "06 12 34 56 78",
      address: "123 rue des Lilas, Paris"
    });

    await contact.save();

    console.log("Contact ajouté avec succès !");
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    mongoose.connection.close();
  }
}

createContact();
