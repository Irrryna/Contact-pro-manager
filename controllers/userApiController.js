const User = require("../models/user");

// GET /api/users → liste tous les utilisateurs
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // on cache le mot de passe
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /api/users/:id → récupère un utilisateur
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/users → crée un nouvel utilisateur
module.exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Erreur de validation", details: err });
  }
};

// DELETE /api/users/:id → supprime un utilisateur
module.exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
