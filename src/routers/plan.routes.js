const router = require("express").Router();
const {
  getPlan,
  create,
  update,
  deletePlan,
} = require("../controllers/plan.controller");

// Plan validation middleware'inden ekleme işlemleri için
const planValidation = require("../middlewares/validations/plan.validation");

// Rotaları tanımla
router.get("/plan/get/:id?", getPlan);
router.post("/plan/create", planValidation.create, create);
router.post("/plan/update", planValidation.update, update);
router.delete("/plan/delete/:planId", planValidation.delete, deletePlan);


module.exports = router;
