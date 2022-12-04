import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/khemsafePay";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  await mongoose.connect(MONGODB_URI);
};
export default dbConnect;
