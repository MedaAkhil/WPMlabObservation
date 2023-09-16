const mongoose = require('mongoose');
const readLine = require('readline');


mongoose.connect('mongodb+srv://Akhilaesh:ZGcUW2vs3R5hxPGJ@myatlasclusteredu.wv2czbn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

  
  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected at mongodb+srv://Akhilaesh:ZGcUW2vs3R5hxPGJ@myatlasclusteredu.wv2czbn.mongodb.net/?retryWrites=true&w=majority`);
  });
  
  mongoose.connection.on('error', err => {
    console.log('error: ' + err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
  });
  
  if (process.platform === 'win32') {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on ('SIGINT', () => {
      process.emit("SIGINT");
    });
  }
  
  const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };
  
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
      process.exit(0);
    });
  });
  
  
  require('./movies');
  require('./webseries');
