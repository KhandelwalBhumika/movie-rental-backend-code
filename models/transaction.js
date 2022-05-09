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
            ref: "Rent"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        balance: {
            type: Number,
        },
        transactionType: {
            type: String,
            enum: ["debit- movie rented", "credit- money added"]
        }
  }, options )

module.exports = mongoose.model('Transaction', transactionSchema)