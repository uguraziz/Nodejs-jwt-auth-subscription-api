const joi = require('joi');
const APIError = require('../../utils/errors');

class subsValidation {
  // Create request validation
  static create = async (req, res, next) => {
    try {
      await joi
        .object({
          user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.pattern.base': 'Geçerli bir kullanıcı ID\'si giriniz',
            'string.required': 'Kullanıcı ID\'si zorunludur',
          }),
          plan_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.pattern.base': 'Geçerli bir plan ID\'si giriniz',
            'string.required': 'Plan ID\'si zorunludur',
          }),
          start_date: joi.date().required().messages({
            'date.base': 'Başlangıç tarihi geçerli bir tarih olmalıdır',
            'date.required': 'Başlangıç tarihi zorunludur',
          }),
          end_date: joi.date().required().messages({
            'date.base': 'Bitiş tarihi geçerli bir tarih olmalıdır',
            'date.required': 'Bitiş tarihi zorunludur',
          }),
          status: joi.string().valid('active', 'inactive', 'cancelled').default('active').messages({
            'string.base': 'Durum metin olmalıdır',
            'any.only': 'Durum aktif, aktif değil veya iptal edilmiş olmalıdır',
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
          plan_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
            'string.pattern.base': 'Geçerli bir plan ID\'si giriniz',
          }),
          start_date: joi.date().optional().messages({
            'date.base': 'Başlangıç tarihi geçerli bir tarih olmalıdır',
          }),
          end_date: joi.date().optional().messages({
            'date.base': 'Bitiş tarihi geçerli bir tarih olmalıdır',
          }),
          status: joi.string().valid('active', 'inactive', 'cancelled').optional().messages({
            'string.base': 'Durum metin olmalıdır',
            'any.only': 'Durum aktif, aktif değil veya iptal edilmiş olmalıdır',
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

module.exports = subsValidation;
