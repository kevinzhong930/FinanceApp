import { query } from '@/app/config/db';
import { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

const bcrypt = require('bcrypt');

export async function POST(req : Request){
    const body = await req.json();
    const {username, password} = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await query({
        query: 'SELECT * FROM users WHERE username = ?',
        values: [username],
    });

    const checkUserResults = checkUser as RowDataPacket[];

    if (checkUserResults.length > 0) {
        return NextResponse.json({ message: 'Username already exists', success : false }, { status: 400 });
    }

    const results = await query({
        query : 'INSERT INTO users (username, password) VALUES (?, ?)',
        values : [username, hashedPassword],
    });

    return NextResponse.json({ results : results}, {status : 200})
}