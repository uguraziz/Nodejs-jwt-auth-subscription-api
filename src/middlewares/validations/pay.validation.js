const joi = require('joi');
const APIError = require('../../utils/errors');

class payValidation {
  // Create request validation
  static create = async (req, res, next) => {
    try {
      await joi
        .object({
          user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.pattern.base': 'Geçerli bir kullanıcı ID\'si giriniz',
            'string.required': 'Kullanıcı ID\'si zorunludur',
          }),
          amount: joi.string().trim().min(0).required().messages({
            "string.base": "Miktar sayı olmalıdır",
            "string.empty": "Miktar boş bırakılamaz",
            "string.min": "Miktar en az 0 karakter olmalıdır",
            "string.required": "Miktar zorunludur",
          }),
          payment_date: joi.date().required().messages({
            'date.base': 'Ödeme tarihi geçerli bir tarih olmalıdır',
            'date.required': 'Ödeme tarihi zorunludur',
          }),
          status: joi.string().valid('completed', 'pending', 'failed').default('completed').messages({
            'string.base': 'Durum metin olmalıdır',
            'any.only': 'Durum Tamamlandı, beklemede veya başarısız olmalıdır',
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError('Lütfen validasyon kurallarına uyun!', 400);
    }
    next();
  };

  // Update request validation
  static update = async (req, res, next) => {
    try {
      await joi
        .object({
          id: joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
            'string.pattern.base': 'Geçerli bir ID\'si giriniz',
          }),
          user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
            'string.pattern.base': 'Geçerli bir kullanıcı ID\'si giriniz',
          }),
          amount: joi.string().trim().min(0).required().messages({
            "string.base": "Miktar sayı olmalıdır",
            "string.empty": "Miktar boş bırakılamaz",
            "string.min": "Miktar en az 0 karakter olmalıdır",
            "string.required": "Miktar zorunludur",
          }),
          payment_date: joi.date().required().messages({
            'date.base': 'Ödeme tarihi geçerli bir tarih olmalıdır',
            'date.required': 'Ödeme tarihi zorunludur',
          }),
          status: joi.string().valid('completed', 'pending', 'failed').default('completed').messages({
            'string.base': 'Durum metin olmalıdır',
            'any.only': 'Durum Tamamlandı, beklemede veya başarısız olmalıdır',
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError('Lütfen validasyon kurallarına uyun!', 400);
    }
    next();
  };

  // Delete request validation
  static delete = async (req, res, next) => {
    try {
      await joi
        .object({
          id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.pattern.base': 'Geçerli bir abonelik ID\'si giriniz',
            'string.required': 'Abonelik ID\'si zorunludur',
          }),
        })
        .validateAsync(req.params);
    } catch (error) {
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError('Lütfen validasyon kurallarına uyun!', 400);
    }
    next();
  };
}

module.exports = payValidation;
