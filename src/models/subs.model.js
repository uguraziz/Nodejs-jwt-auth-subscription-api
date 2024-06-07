const mongoose = require('mongoose');

// Subscription şemasını tanımla
const subscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'plans',
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active',
    },
  },
  { collection: 'subs', timestamps: true }
);

// Subscription modelini oluştur
const subs = mongoose.model('subs', subscriptionSchema);

module.exports = subs;