const mongoose = require('mongoose');

// payments şemasını tanımla
const paymentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    amount: {
        type: Number,
        trim: true,
        required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      default: 'completed',
      required: true,
    },
  },
  { collection: 'pays', timestamps: true }
);

// payments modelini oluştur
const pay = mongoose.model('pays', paymentsSchema);

module.exports = pay;