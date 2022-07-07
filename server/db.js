require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const query = cb => async (...params) => {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([
            cb(...params),
            new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out")), 10000))
        ]);
        await mongoose.connection.close();
        console.log("MongoDB disconneted");
        return result;
    } catch(e) {
        await mongoose.connection.close();
        console.log(e.message);
    }
}

module.exports.createNewUser = query(async (userDetails) => new User(userDetails).save())

module.exports.getUserByUsername = query(async (username) => User.findOne({ username }).exec())

module.exports.getUserById = query(async (id) => User.findById(id).exec())

module.exports.addSnippet = query(async (id, snippet) => User.findByIdAndUpdate(id, { $push: { snippets: snippet } }, { new: true }));

module.exports.updateSnippet = query(async (id, snippet) => {
    const user = await User.findById(id).exec();
    const thisSnippet = user.snippets.id(snippet._id);
    thisSnippet.text = snippet.text;
    if (snippet.title) {
        thisSnippet.title = snippet.title;
    }
    await user.save();
    return User.findById(id).exec();
})

module.exports.deleteSnippet = query(async (id, snippetId) => {
    const user = await User.findById(id).exec();
    const thisSnippet = user.snippets.id(snippetId);
    thisSnippet.remove();
    return user.save()
})