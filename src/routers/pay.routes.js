const router = require("express").Router();
const {
    getPay,
    create,
    update,
    deletePay,
  } = require("../controllers/pay.controller");

// Payments validation middleware'inden ekleme işlemleri için
const payValidation = require("../middlewares/validations/pay.validation");

router.get("/pay/get/:id?", getPay);
router.post("/pay/create", payValidation.create, create);
router.post("/pay/update", payValidation.update, update);
router.delete("/pay/delete/:id", payValidation.delete, deletePay);

module.exports = router;
