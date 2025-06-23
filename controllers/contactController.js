const Contact = require("../models/contact");

// Page d’accueil avec la liste des contacts
module.exports.showHomePage = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.session.user._id });
    res.render("home", { contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// Affiche le formulaire d’ajout
module.exports.showForm = (req, res) => {     
  res.render("add-item", { error: null });
};

// Traite le formulaire d’ajout
module.exports.createContact = async (req, res) => {
  try {
    if (!req.body.lastName || !req.body.firstName) {
      return res.render("add-item", { error: "Tous les champs sont obligatoires !" });
    }

    const contact = new Contact({
      user: req.session.user._id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      company: req.body.company,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      sector: req.body.sector,
      actif: req.body.actif === "on",
    });

    await contact.save();
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.render("add-item", { error: "Erreur lors de l'ajout du contact." });
  }
};

// Affiche les infos d'un contact par son ID
module.exports.showContactDetails = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOne({
      _id: contactId,
      user: req.session.user._id
    });

    if (!contact) {
      return res.status(404).send("Contact introuvable");
    }

    res.render("item", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
