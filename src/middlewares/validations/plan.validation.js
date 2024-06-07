const joi = require("joi");
const APIError = require("../../utils/errors");

class planValidation {
  // plan ekleme doğrulama
  static create = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "İsim metin olmalıdır",
            "string.empty": "İsim boş bırakılamaz",
            "string.min": "İsim en az 3 karakter olmalıdır",
            "string.max": "İsim en fazla 100 karakter olmalıdır",
            "string.required": "İsim zorunludur",
          }),
          duration_months: joi.string().trim().min(1).max(36).required().messages({
            "string.base": "Süre sayı(ay) olmalıdır",
            "string.empty": "Süre boş bırakılamaz",
            "string.min": "Süre en az 1 karakter olmalıdır",
            "string.max": "Süre en fazla 36 karakter olmalıdır",
            "string.required": "Süre zorunludur",
          }),
          price: joi.string().trim().min(0).required().messages({
            "string.base": "Price sayı olmalıdır",
            "string.empty": "Price boş bırakılamaz",
            "string.min": "Price en az 0 karakter olmalıdır",
            "string.required": "Price zorunludur",
          })
        })
        .validateAsync(req.body);
    } catch (error) {
      console.log(error?.details);
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError("Lütfen validasyon kurallarına uyun!", 400);
    }
    next();
  };

  // Plan güncelleme doğrulama ve işlemi
  static update = async (req, res, next) => {
    try {
      await joi
        .object({
          planId: joi.string().trim().required().messages({
            "string.base": "Plan ID metin olmalıdır",
            "string.empty": "Plan ID boş bırakılamaz",
            "string.required": "Plan ID zorunludur",
          }),
          name: joi.string().trim().min(3).max(100).messages({
            "string.base": "İsim metin olmalıdır",
            "string.empty": "İsim boş bırakılamaz",
            "string.min": "İsim en az 3 karakter olmalıdır",
            "string.max": "İsim en fazla 100 karakter olmalıdır",
          }),
          duration_months: joi.string().trim().min(1).max(36).messages({
            "string.base": "Süre sayı(ay) olmalıdır",
            "string.empty": "Süre boş bırakılamaz",
            "string.min": "Süre en az 1 karakter olmalıdır",
            "string.max": "Süre en fazla 36 karakter olmalıdır",
          }),
          price: joi.string().trim().min(0).messages({
            "string.base": "Price sayı olmalıdır",
            "string.empty": "Price boş bırakılamaz",
            "string.min": "Price en az 0 karakter olmalıdır",
          })
        })
        .validateAsync(req.body);
    } catch (error) {
      console.log(error?.details);
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError("Lütfen validasyon kurallarına uyun!", 400);
    }
    next();
  };

  // Plan silme işlemi
  static delete = async (req, res, next) => {
    try {
      await joi
        .object({
          planId: joi.string().trim().required().messages({
            "string.base": "Plan ID metin olmalıdır",
            "string.empty": "Plan ID boş bırakılamaz",
            "string.required": "Plan ID zorunludur",
          })
        })
        .validateAsync(req.params);
    } catch (error) {
      console.log(error?.details);
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError("Lütfen validasyon kurallarına uyun!", 400);
    }
    next();
  };
}

module.exports = planValidation;
