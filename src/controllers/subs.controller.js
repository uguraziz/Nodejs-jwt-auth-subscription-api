const router = require("express").Router();
const users = require("../models/user.model");
const plans = require("../models/plan.model");
const subs = require("../models/subs.model");

const APIError = require("../utils/errors");
const Response = require("../utils/response");

// /:id? parametre olarak id varsa o id yi yoksa tüm verileri döndürür
const getSubs = async (req, res, next) => {
    const { id } = req.params;

    let sub;
    if (id) {
        sub = await subs.findById(id);
        if (!sub) {
            throw new APIError("Abonelik bulunamadı", 404);
        }
    } else {
        sub = await subs.find();
    }

    return new Response(sub, "Subscription getirildi").success(res);
};

const create = async (req, res) => {
    const { user_id, plan_id } = req.body;

    // Kullanıcı ve planın var olup olmadığını kontrol et
    const user = await users.findById(user_id);
    if (!user) {
        throw new APIError("Kullanıcı bulunamadı", 404);
    }

    const plan = await plans.findById(plan_id);
    if (!plan) {
        throw new APIError("Plan bulunamadı", 404);
    }

    // Yeni abonelik oluştur
    const planSave = new subs(req.body);

    await planSave
        .save()
        .then((result) => {
            return new Response(result, "Abonelik kaydı başarılı").created(res);
        })
        .catch((err) => {
            throw new APIError("Abonelik kaydı başarısız!", 400);
        });
};

const update = async (req, res) => {
    const { id, user_id, plan_id, start_date, end_date, status } = req.body;

    // Abonelik belgesini güncelle
    const subscription = await subs.findById(id);
    if (!subscription) {
        throw new APIError("Abonelik bulunamadı", 404);
    }

    // Kullanıcı ve planı kontrol et (isteğe bağlı)
    if (user_id) {
        const user = await users.findById(user_id);
        if (!user) {
            throw new APIError("Kullanıcı bulunamadı", 404);
        }
    }

    if (plan_id) {
        const plan = await plans.findById(plan_id);
        if (!plan) {
            throw new APIError("Plan bulunamadı", 404);
        }
    }

    // Güncelleme işlemini gerçekleştir
    subscription.plan_id = plan_id;
    subscription.start_date = start_date;
    subscription.end_date = end_date;
    subscription.status = status;

    await subscription
        .save()
        .then((result) => {
            return new Response(result, "Abonelik güncellendi").success(res);
        })
        .catch((err) => {
            throw new APIError("Abonelik güncelleme başarısız!", 400);
        });
};

const deleteSubs = async (req, res) => {
    const { id } = req.params;

    // Abonelik belgesini sil
    const subscription = await subs.findByIdAndDelete(id);
    if (!subscription) {
        throw new APIError("Silinecek abonelik bulunamadı", 404);
    }

    return new Response({}, "Abonelik başarıyla silindi").success(res);
};


module.exports = { getSubs, create, update, deleteSubs };
