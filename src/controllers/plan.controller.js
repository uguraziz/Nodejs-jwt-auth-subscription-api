const router = require("express").Router();
const plan = require("../models/plan.model");

const APIError = require("../utils/errors");
const Response = require("../utils/response");

// /:id? parametre olarak id varsa o id yi yoksa tüm verileri döndürür
const getPlan = async (req, res, next) => {
    const { id } = req.params;

    let plans;
    if (id) {
        plans = await plan.findById(id);
        if (!plans) {
            throw new APIError("Plan bulunamadı", 404);
        }
    } else {
        plans = await plan.find();
    }

    return new Response(plans, "Plan getirildi").success(res);
};

const create = async (req, res) => {
    const { name } = req.body;
    const nameInfo = await plan.findOne({ name }).collation({ locale: "en", strength: 2 });

    if (nameInfo) {
        throw new APIError("Plan zaten var", 401);
    }

    const planSave = new plan(req.body);
    await planSave
        .save()
        .then((result) => {
            return new Response(result, "Kayıt başarılı").created(res);
        })
        .catch((err) => {
            throw new APIError("Kayıt başarısız!", 400);
        });
};

const update = async (req, res) => {
    const { planId, name, duration_months, price } = req.body;
    // Güncellenecek planı bul
    const planToUpdate = await plan.findById(planId);
    if (!planToUpdate) {
        throw new APIError("Güncellenecek plan bulunamadı", 404);
    }

    // Güncelleme işlemini gerçekleştir
    planToUpdate.name = name;
    planToUpdate.duration_months = duration_months;
    planToUpdate.price = price;

    await planToUpdate
        .save()
        .then((result) => {
            return new Response(result, "Plan güncellendi").success(res);
        })
        .catch((err) => {
            throw new APIError("Plan güncelleme başarısız!", 400);
        });
};

const deletePlan = async (req, res) => {
    const { planId } = req.params;
    // Silinecek planı bul ve sil
    const planToDelete = await plan.findByIdAndDelete(planId);

    if (!planToDelete) {
        throw new APIError("Silinecek plan bulunamadı", 404);
    }

    // Başarılı yanıtı döndür
    return new Response({}, "Plan silindi").success(res);
};

module.exports = {
    getPlan,
    create,
    update,
    deletePlan
};
