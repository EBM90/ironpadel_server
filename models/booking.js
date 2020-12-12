const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el modelo User

const bookingSchema = new Schema(
  {
    name: String,
    date: {type: Schema.Types.ObjectId, ref: 'Date'},
    hour: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    players:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    winners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    losers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
