const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el modelo User

const notificationSchema = new Schema(
  {
    message: String,
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
