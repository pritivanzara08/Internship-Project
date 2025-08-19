import mongoose from 'mongoose';

type MongooseWithCache = typeof mongoose & {
  conn: typeof mongoose.connection | null;
  promise: Promise<typeof mongoose.connection> | null;
};

declare global {
  var _mongoose: MongooseWithCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any)._mongoose as MongooseWithCache | undefined;

if (!cached) {
  cached = (global as any)._mongoose = { 
    conn: null, 
    promise: null,
  } as MongooseWithCache;
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    cached!.promise = mongoose.connect(MONGODB_URI, {
      // No need for legacy options in Mongoose 6+
    } as any) as unknown as Promise<mongoose.Connection>;
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;