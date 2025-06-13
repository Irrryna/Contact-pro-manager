const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware); // protège toutes les routes ci-dessous

router.get("/", contactController.listContacts);
router.get("/add", contactController.showForm);
router.post("/add", contactController.createContact);
