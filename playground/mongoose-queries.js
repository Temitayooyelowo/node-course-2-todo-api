const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5af78399d6776e47d0d31c2711';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID is not valid');
// }
// Todo.find({
//   _id: id //mongoose converts it to an object id directly
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id //mongoose converts it to an object id directly
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

//handle queries work by user not found
//handle user was found. Print user to screen
//print error object if error occurs

let userId = '5af75a30e2a9c9842cdc89bf';
User.findById(userId).then((user) => {
  if(!user){
    return console.log('User not found');
  }

  console.log('User By Id', user);
}).catch((e) => console.log(e));
