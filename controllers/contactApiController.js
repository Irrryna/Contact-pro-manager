const Contact = require("../models/contact");

// GET /api/contacts → liste tous les contacts
module.exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /api/contacts/:id → un seul contact
module.exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact non trouvé" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/contacts → ajouter un contact
module.exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: "Données invalides", details: err });
  }
};

// PUT /api/contacts/:id → modifier un contact
module.exports.updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Contact non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la modification", details: err });
  }
};

// DELETE /api/contacts/:id → supprimer un contact
module.exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Contact non trouvé" });
    res.json({ message: "Contact supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
