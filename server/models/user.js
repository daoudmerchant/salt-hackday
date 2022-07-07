const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SnippetSchema = new Schema(
  {
    title: {type: String, maxLength: 20},
    text: {type: String, required: true},
  }
)

const UserSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 20},
    password: {type: String, required: true},
    snippets: {type: [SnippetSchema], default: []}
  }
);

UserSchema.methods = {
  validatePassword: function (unchecked) {
    return bcrypt.compareSync(unchecked, this.password)
  },
  hashPassword: unhashed => {
    return bcrypt.hashSync(unhashed, 10)
  }
}

UserSchema.pre('save', function (next) {
  this.password = this.hashPassword(this.password)
  next()
})

module.exports = mongoose.model('User', UserSchema);