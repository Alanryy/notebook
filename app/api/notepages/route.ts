import { NextResponse } from "next/server";
import mysql, { PoolConnection } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';

// Create a MySQL connection pool with your configuration
const pool = mysql.createPool({
  host: 'localhost',
  database: 'notesdata',
  user: 'root',
  password: '',
  connectionLimit: 10,
});
