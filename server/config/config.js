let env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  let config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
  //console.log(Object.keys(envConfig));
  //console.log(config);
}

// if(env === 'development'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env === 'test'){
//   process.env.PORT = 300;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
