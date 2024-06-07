const router = require("express").Router();
const auth = require("./auth.routes");
const plan = require("./plan.routes");
const subs = require("./subs.routes");
const pay = require("./pay.routes");

// Auth rotalarını bu ana router'a ekleyerek kullanımını sağla
router.use(auth);
router.use(plan);
router.use(subs);
router.use(pay);

module.exports = router;
