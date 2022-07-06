const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 20},
    password: "hello"
  }
);

UserSchema
  .virtual('example')
  .get(function() {
    console.log(this.password); // logs "hello"
  });

module.exports = mongoose.model('User', UserSchema);