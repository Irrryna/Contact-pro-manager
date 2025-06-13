const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    sector: { type: String, required: true },
    actif: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Contact", contactSchema);
const Contact = require("../models/contact");

module.exports.showHomePage = async (req, res) => {
  try {
    // On récupère les contacts de l'utilisateur connecté
    const contacts = await Contact.find({ user: req.session.user._id });
    
    res.render("home", { contacts });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};
