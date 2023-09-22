import { NextResponse } from "next/server";
import mysql, { PoolConnection } from 'mysql2/promise';


// Create a MySQL connection pool with your configuration
const pool = mysql.createPool({
  host: 'localhost',
  database: 'notesdata',
  user: 'root',
  password: '',
  connectionLimit: 10,
});


const fetchDataFromDatabase = async (): Promise<any[]> => {
  const connection: PoolConnection = await pool.getConnection();
  const [rows] = await connection.execute('SELECT * FROM pages');
  connection.release();
  return rows as any[];
};

const insertDataIntoDatabase = async (data: any): Promise<void> => {
  const connection: PoolConnection = await pool.getConnection();
  await connection.execute('INSERT INTO pages (title, categorie,content) VALUES (?, ?,?)', [
    data.title,
    data.categorie,
    data.content,
  ]);
  connection.release();
};

const updateDataInDatabase = async (id: number, data: any): Promise<void> => {
  const connection: PoolConnection = await pool.getConnection();
  await connection.execute('UPDATE pages SET title = ?, categorie = ?, content = ? WHERE id = ?', [
    data.title,
    data.categorie,
    data.content,
    id,
  ]);
  connection.release();
};

const deleteDataFromDatabase = async (id : any): Promise<void> => {
  const connection: PoolConnection = await pool.getConnection();
  await connection.execute('DELETE FROM pages WHERE id = ?', [id]);
  console.log(id);
  connection.release();
};



export const GET = async (req: Request, res: Response) => {
  try {
    const data = await fetchDataFromDatabase();
    return NextResponse.json({ message:"ok", data}, { status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Error", err },{status: 500,});
  }
};

export const POST = async (req: Request, res: Response) => {
  const   { title , categorie , content} = await req.json();
  const data ={
    title:title,
    categorie:categorie,
    content:content,
  }
  try {
    const post =  await insertDataIntoDatabase(data);
    return NextResponse.json({ message:"data inserted", data}, { status: 200});
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