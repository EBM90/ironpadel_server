const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const achievementSchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

// const createAchievements = async () => {
//   for(let i = 0; i < 1 ; i++){
//     const name = 'Unstoppable' 
//     const description = 'Win ten games!'
//     const image = '/tenwins.png'
//     const firstAchievement = await Achievement.create({ name, description, image });
//     console.log(firstAchievement)
//   }
    
// };



// createAchievements()

module.exports = Achievement;
