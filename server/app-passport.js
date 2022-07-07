// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require('bcryptjs');
// const db = require('./db');

// // set up local strategy
// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//     const user = await db.getUserByUsername(username);
//     if (!user) {
//         return done(null, false, { message: "No user found" });
//     }
//     const matches = await bcrypt.compare(password, user.password);
//     if (matches) {
//         // passwords match! log user in
//         return done(null, user)
//     }
//     // passwords do not match!
//     return done(null, false, { message: "Incorrect password" })
//     })
// );

// passport.serializeUser((user, done)=> {
//     done(null, user.id); // _id?
// });
    
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await db.getUserById(id);
//         done(null, user);
//     } catch(e) {
//         done(e, null)
//     }
// });

// module.exports = passport;