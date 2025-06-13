module.exports = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/connection"); // l'utilisateur n’est pas connecté
    }
  
    next(); // si utilisateur connecté → on continue
  };
  