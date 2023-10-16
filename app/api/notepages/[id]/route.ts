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
  content: String
});

// Define your model
const Page = mongoose.models['page.coll'] || mongoose.model('page.coll', pageSchema);


// Fetch data from database
const fetchDataFromDatabase = async (title:string|null): Promise<any[]> => {
  await connectDB();
  return Page.find({title : title},{_id:0,content:1});
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
const deleteDataFromDatabase = async (category: string, title: string): Promise<void> => {
  await connectDB();
  await Page.deleteMany({ category: category, title: title });
};


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {

    const title = req.nextUrl.searchParams.get("title");
    const data = await fetchDataFromDatabase(title);
    return NextResponse.json({ message:"ok", data}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", err},{status: 500,});
  }
};

export const POST = async (req: Request, res: Response) => {
  const { title, categorie, content } = await req.json();
  const data = {
    title,
    categorie,
    content  
  };

  try {
    const deleteResult = await deleteDataFromDatabase(categorie, title);
    const insertResult = await insertDataIntoDatabase(data);
    return NextResponse.json({ message: "Data inserted successfully", insertResult }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
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
/*
export const DELETE = async (req: Request, res: Response) => {
  const  id  =  req.url.split("notepages/")[1];
  try {
    const del =  await deleteDataFromDatabase(id);
    return NextResponse.json({ message:"data DELETED", del}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", id},{status: 500,});
  }

};*/