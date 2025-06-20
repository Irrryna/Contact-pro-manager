const express = require("express");
const router = express.Router();
const contactApiController = require("../controllers/contactApiController");
const userApiController = require("../controllers/userApiController");

// Récupérer tous les contacts
router.get("/contacts", contactApiController.getContacts);

// Récupérer un contact par ID
router.get("/contacts/:id", contactApiController.getContactById);

// Ajouter un contact
router.post("/contacts", contactApiController.createContact);

// Modifier un contact
router.put("/contacts/:id", contactApiController.updateContact);

// Supprimer un contact
router.delete("/contacts/:id", contactApiController.deleteContact);

// Routes API pour les utilisateurs
router.get("/users", userApiController.getUsers);
router.get("/users/:id", userApiController.getUserById);
router.post("/users", userApiController.createUser);
router.delete("/users/:id", userApiController.deleteUser);

module.exports = router;
