const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'temitayo@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass'
}]

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done()); //wipe out all of our todos
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    //wait for all save actions to complete
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos: todos,
  populateTodos: populateTodos,
  users: users,
  populateUsers: populateUsers
};