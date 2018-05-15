const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true, //we can't have 2 documents in the user collection with the same email
    validate: {
      validator: (value) => {
        return validator.isEmail(value); //validator module
      },
      message: '{VALUE} is not a valid email'
    }//mongoose custom validator
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']); //avoid returning the password and the tokens array
};

UserSchema.methods.generateAuthToken = function () {
  let user = this; //arrow functions don't bind the this keyword
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}])

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
};
