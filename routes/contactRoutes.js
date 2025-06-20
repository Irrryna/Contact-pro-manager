const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");

// Applique l'authMiddleware à toutes les routes ci-dessous
router.use(authMiddleware);

// Liste des contacts
router.get("/", contactController.listContacts);

// Formulaire d’ajout
router.get("/add", contactController.showForm);
router.post("/add", contactController.createContact);

// Voir les détails d’un contact
router.get("/contact/:id", contactController.showContactDetails);

module.exports = router;
