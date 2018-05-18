const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.removeToken = function (token) {
  let user = this;

  return user.update({
    $pull: {
        tokens: {
          token: token
        }
    } //using $pull method to remove tokens
  });
};

//.statics for model methods
UserSchema.statics.findByToken = function (token) {
  let User = this; //model is the this binding
  let decoded = undefined; //stores the decoded jwt VALUE

  try{
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return new Promise((resolve, reject) => {
      reject(); //promise should ALWAYS reject when there's an error
    }); //we can also do return Promise.reject();
  }

  return User.findOne({ //this will return a promise
    '_id': decoded._id,
    'tokens.token': token, //quotes are required when we have a dot in the key
    'tokens.access': 'auth'
  })

};

UserSchema.statics.findByCredentials = function (email, password){

  return User.findOne({'email':email}).then((user) => {
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {

      bcrypt.compare(password, user.password, (error, res) => {
        if(res){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  });

};

UserSchema.pre('save', function(next) {
  let user = this;

  let isModified = user.isModified('password'); //returns false if password was NOT modified

  if(isModified){
    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash; //hide plain text password
        next();
      });
    });
    //next();
  }else{
    next();
  }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
};
