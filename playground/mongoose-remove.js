const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: '5af869ed3fd3fe264cc05792'}).then((todo) => {
//
// });

Todo.findByIdAndRemove('5af869ed3fd3fe264cc05792').then((todo) => {
  console.log(todo);
});
