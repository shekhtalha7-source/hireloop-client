
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error("MONGODB_URL is missing in environment variables");
}

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Reuse MongoDB client across hot reloads
const client =
  globalThis._mongoClient ?? new MongoClient(uri);

globalThis._mongoClient = client;

export { client };

// Select HireLoop database
export const db: Db = client.db("hireloopdb");

// Connect to MongoDB when needed
export async function connectToDatabase() {
  globalThis._mongoClientPromise ??= client.connect();

  await globalThis._mongoClientPromise;

  return db;
}
