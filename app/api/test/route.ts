import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;
  // Using new database connection
  await mongoose.connect('mongodb+srv://alanry:CR6SNRZiEXvs2syg@pages.uhhsclp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  return true;
};

export const GET = async (req: Request, res: Response) => {
  const isConnected = await connectDB();
  return NextResponse.json({ connected: isConnected });
};
