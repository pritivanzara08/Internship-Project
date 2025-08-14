import mongoose from 'mongoose';

interface CustomGlobal {
  mongoose?: {
	conn: any | null;
	promise: any | null;
  };
}

declare const global: CustomGlobal;

interface CustomGlobalThis extends Global {
  mongoose?: {
	conn: any | null;
	promise: any | null;
  };
}

declare const globalThis: CustomGlobalThis;

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

if (!cached) {
cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
if (cached.conn) {
return cached.conn;
}

if (!cached.promise) {
const uri = process.env.MONGODB_URI!;
cached.promise = mongoose.connect(uri, {
// useNewUrlParser: true, useUnifiedTopology: true are defaults in v6
});
}
cached.conn = await cached.promise;
return cached.conn;
}

export default dbConnect;