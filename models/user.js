const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el modelo User

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    description: String,
    image: { type: String, default: '/default-profile.jpg' },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    wins: { type: Number, default: 0 },
    games:{ type: Number, default: 0 },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
