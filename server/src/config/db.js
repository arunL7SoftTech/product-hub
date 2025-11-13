import mongoose from "mongoose";

const normalizeMongoUri = (uri) => {
  if (!uri) return uri;
  return uri.replace("mongodb://localhost", "mongodb://127.0.0.1");
};

const connectDB = async () => {
  const connectionString = normalizeMongoUri(process.env.MONGODB_URI);

  if (!connectionString) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  mongoose.set("strictQuery", true);

  try {
    const { connection } = await mongoose.connect(connectionString, {
      maxPoolSize: 10,
    });

    console.log(`MongoDB connected: ${connection.host}`);
    console.log(`Database: ${connection.name}`);
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    if (error?.name === "MongooseServerSelectionError") {
      console.error("\n⚠️  MongoDB Connection Troubleshooting:");
      console.error("1. Ensure MongoDB is running on your system");
      console.error("2. On Windows, run: 'net start MongoDB'");
      console.error("3. Or install MongoDB as a service");
      console.error(
        "4. Check if MongoDB Compass can connect to: mongodb://127.0.0.1:27017"
      );
    }

    process.exit(1);
  }
};

export default connectDB;
