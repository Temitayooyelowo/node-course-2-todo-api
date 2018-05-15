let {User} = require('./../models/user');

//Middleware function
let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject(); //To avoid duplicate code. The error case will happen and the catch will be called so it'll return res.status(401).send();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
    //we don't call next here because we don't want it to work if authentication fails
  });
};

module.exports = {
  authenticate: authenticate
};
