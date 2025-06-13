const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Formulaire de connexion
router.get("/connection", authController.showConnectionForm);

// Soumission du formulaire
router.post("/connection", authController.connectUser);

// Déconnexion
router.get("/logout", authController.logoutUser);

module.exports = router;
