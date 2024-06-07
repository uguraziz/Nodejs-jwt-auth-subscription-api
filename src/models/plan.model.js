const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        duration_months: {
            type: Number,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
    },
    { collection: "plans", timestamps: true }
);

const plan = mongoose.model("plans", planSchema);

module.exports = plan;