const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://chimaobidev:1MiuA6rfwidLgDBG@tasks-cluster.49bf0yw.mongodb.net/?retryWrites=true&w=majority&appName=tasks-cluster'; 
// should be stored in .env file

if (!MONGO_URI) throw new Error('MONGO_URI is not defined');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
