import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';



// Create a MySQL connection pool with your configuration

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect('mongodb+srv://alanry:CR6SNRZiEXvs2syg@pages.uhhsclp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
};

// Define your schema
const pageSchema = new mongoose.Schema({
  title: String,
  categorie: String,
  content: String,
});

// Define your model
const Page = mongoose.models['page.coll'] || mongoose.model('page.coll', pageSchema);


// Fetch data from database
const fetchDataFromDatabase = async (categorie:string|null): Promise<any[]> => {
  await connectDB();
  return Page.find({categorie : categorie},{_id:0,title:1});
};

// Insert data into database
const insertDataIntoDatabase = async (data: any): Promise<void> => {
  await connectDB();
  await Page.create(data);
};

// Update data in database
const updateDataInDatabase = async (id: string, data: any): Promise<void> => {
  await connectDB();
  await Page.findByIdAndUpdate(id, data);
};

// Delete data from database
const deleteDataFromDatabase = async (id : string): Promise<void> => {
  await connectDB();
  await Page.findByIdAndDelete(id);
};


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {

    const category = req.nextUrl.searchParams.get("category");
    const data = await fetchDataFromDatabase(category);
    return NextResponse.json({ message:"ok", data}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", err},{status: 500,});
  }
};
export const POST  = async (req: NextRequest, res: NextResponse) => {
  const title = req.nextUrl.searchParams.get("title");
  const category = req.nextUrl.searchParams.get("category");
  const content = req.nextUrl.searchParams.get("content");
  const data ={
    title:title,
    categorie:category,
    content:content,
  }
  try {
    const post =  await insertDataIntoDatabase(data);
    return NextResponse.json({ message:"data inserted", post}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", err},{status: 500,});
  }

};

export const PUT = async (req: Request, res: Response) => {
  const   { id ,title , categorie , content} = await req.json();
  const data ={
    title:title,
    categorie:categorie,
    content:content,
  }
  try {
    const put =  await updateDataInDatabase(id,data);
    return NextResponse.json({ message:" Data updated",put}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", err },{status: 500,});
  }

};

export const DELETE = async (req: Request, res: Response) => {
  const  id  =  req.url.split("notepages/")[1];
  try {
    const del =  await deleteDataFromDatabase(id);
    return NextResponse.json({ message:"data DELETED", del}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", id},{status: 500,});
  }

};