const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el modelo User

const dateSchema = new Schema(
  {
    day: Number,
    month: String,
    available: Array,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Date = mongoose.model("Date", dateSchema);

// const createDates = async () => {
//   for (let i = 26; i <= 30; i++) {
//     const day = i;
//     const month = "November";
//     const available = [
//       "09:00-10:00",
//       "10:00-11:00",
//       "11:00-12:00",
//       "17:00-18:00",
//       "18:00-19:00",
//       "19:00-20:00",
//     ];
//     console.log(day, month);
//     const newDate = await Date.create({ day, month, available });
//   }
// };
// createDates();

module.exports = Date;
