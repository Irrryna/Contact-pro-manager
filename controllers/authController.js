const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET connection → affiche la page de connexion
module.exports.showConnectionForm = (req, res) => {
    res.render("connection", { error: null });
};

// POST /connection → traite les infos du formulaire
module.exports.connectUser = async (req, res) => {
    const { email, password } = req.body;

    // Cherche l'utilisateur dans la base
    let user = await User.findOne({ email });

    if (!user) {
        // si l'email n'est pas trouvé
        return res.render("connection", { error: "Email invalide" });
    }

    // Vérifie le mot de passe avec bcrypt
    let valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        // si le mot de passe est faux
        return res.render("connection", { error: "Mot de passe incorrect" });
    }

    // Authentification réussie : on enregistre l'utilisateur dans la session
    req.session.user = user;

    // Redirection vers la page d’accueil
    res.redirect("/home");
};

// GET /logout → déconnexion
module.exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/connection");
    });
};
