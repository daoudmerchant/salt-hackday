require("dotenv").config();
const mongoose = require("mongoose");
// import Models here

const connect = () => mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection open"))
  .catch(console.error);


// const seedData = [];


const seedDB = async () => {
  try {
    await connect();
    // await Model.deleteMany({});
    // await Model.insertMany(seedArtists);
    // console.log("Seeded")
  } catch (e) {
    console.error(e.message);
  }
};
seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  })
  .catch((err) => console.error(err));