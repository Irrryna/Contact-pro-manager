require("dotenv").config();
const apiRoutes = require("./routes/apiRoutes");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const contactController = require("./controllers/contactController");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL);

// Configuration EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout"); // layout.ejs

// Middleware de session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Injecter la session dans les vues EJS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Autres middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/", authRoutes);
app.get("/home", authMiddleware, contactController.showHomePage);
app.use("/api", apiRoutes);


// Lancer le serveur
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});