var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://admin:admin@1@ds221990.mlab.com:21990/node-todo-api'
};

mongoose.connect(db.localhost || db.mlab);

module.exports = {
  mongoose: mongoose
};
