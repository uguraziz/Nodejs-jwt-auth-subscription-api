const router = require("express").Router();
const {
    getSubs,
    create,
    update,
    deleteSubs
  } = require("../controllers/subs.controller");

// Subscription validation middleware'inden ekleme işlemleri için
const subsValidation = require("../middlewares/validations/subs.validation");

router.get("/subs/get/:id?", getSubs);
router.post("/subs/create", subsValidation.create, create);
router.post("/subs/update", subsValidation.update, update);
router.delete("/subs/delete/:id", subsValidation.delete, deleteSubs);

module.exports = router;
