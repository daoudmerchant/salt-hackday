require('dotenv').config();
const mongoose = require('mongoose');
// import models

const query = cb => async params => {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([cb(params), new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out")), 10000))]);
        await mongoose.connection.close();
        console.log("MongoDB disconneted");
        return result;
    } catch(e) {
        await mongoose.connection.close();
        console.log(e.message);
    }
}


module.exports.getAll = query(async () => {
    // TODO: Replace with model
    return await Model.find({}).exec();
})

// more getters