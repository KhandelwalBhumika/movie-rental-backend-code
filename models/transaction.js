const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: 'modifiedAt',
    },
  };

  const transactionSchema = new mongoose.Schema({
        rentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rent",
            default: null
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
            default: null
        },
        balance: {
            type: Number,
            default: 0
        },
        amountAdded: {
            type: Number,
            default: 0
        },
        transactionType: {
            type: String,
            enum: ["debit- movie rented", "credit- money added"],
            default: "debit- movie rented"
        }
  }, options )

module.exports = mongoose.model('Transaction', transactionSchema)