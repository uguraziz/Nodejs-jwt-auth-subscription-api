const router = require("express").Router();
const users = require("../models/user.model");
const pay = require("../models/pay.model");

const APIError = require("../utils/errors");
const Response = require("../utils/response");

// /:id? parametre olarak id varsa o id yi yoksa tüm verileri döndürür
const getPay = async (req, res, next) => {
    const { id } = req.params;

    let pays;
    if (id) {
        pays = await pay.findById(id);
        if (!sub) {
            throw new APIError("Ödeme bulunamadı", 404);
        }
    } else {
        pays = await pay.find();
    }

    return new Response(pays, "Ödemeler getirildi").success(res);
};

const create = async (req, res) => {
    const { user_id } = req.body;

    // Kullanıcı ve planın var olup olmadığını kontrol et
    const user = await users.findById(user_id);
    if (!user) {
        throw new APIError("Kullanıcı bulunamadı", 404);
    }

    // Yeni Ödeme oluştur
    const paySave = new pay(req.body);

    await paySave
        .save()
        .then((result) => {
            return new Response(result, "Ödeme kaydı başarılı").created(res);
        })
        .catch((err) => {
            throw new APIError("Ödeme kaydı başarısız!", 400);
        });
};

const update = async (req, res) => {
    const { id, user_id, amount, payment_date, status } = req.body;

    // Ödeme belgesini güncelle
    const pays = await pay.findById(id);
    if (!pays) {
        throw new APIError("Ödeme bulunamadı", 404);
    }

    // Kullanıcı ve planı kontrol et (isteğe bağlı)
    if (user_id) {
        const user = await users.findById(user_id);
        if (!user) {
            throw new APIError("Kullanıcı bulunamadı", 404);
        }
    }

    // Güncelleme işlemini gerçekleştir
    pays.amount = amount;
    pays.payment_date = payment_date;
    pays.status = status;

    await pays
        .save()
        .then((result) => {
            return new Response(result, "Ödeme güncellendi").success(res);
        })
        .catch((err) => {
            throw new APIError("Ödeme güncelleme başarısız!", 400);
        });
};

const deletePay = async (req, res) => {
    const { id } = req.params;

    // Ödeme belgesini sil
    const pays = await pay.findByIdAndDelete(id);
    if (!pays) {
        throw new APIError("Silinecek Ödeme bulunamadı", 404);
    }

    return new Response({}, "Ödeme başarıyla silindi").success(res);
};


module.exports = { getPay, create, update, deletePay };
