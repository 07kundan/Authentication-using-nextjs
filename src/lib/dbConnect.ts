import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number | null;
};

const connection: ConnectionObject = {
  isConnected: null,
};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    // console.log(db);
    // console.log(db.connections)
    connection.isConnected = db.connections[0].readyState;

    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
    console.log("database connection failed");
    process.exit(1);
  }
}

export default dbConnect;
