import { query } from '@/app/config/db';
import { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const bcrypt = require('bcrypt');

export async function POST(req : Request){
    const body = await req.json();
    const {username, password} = body;

    const checkUser = await query({
        query: 'SELECT * FROM users WHERE username = ?',
        values: [username],
    });

    const checkUserResults = checkUser as RowDataPacket[];

    if (checkUserResults.length > 0) {
        const user = checkUserResults[0];
        const hashedPassword = user.password;

        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            const token = randomBytes(48).toString('hex')

            await query({
                query : 'UPDATE users SET token = ? WHERE username = ?',
                values : [token, username],
            })

            const response = NextResponse.json({ message: 'Login successful', success : true }, { status: 200 });
            response.cookies.set('token', token, {maxAge: 60 * 60 * 24 * 7})
            return response;
        } else {
            return NextResponse.json({ message: 'Invalid credentials', success : false }, { status: 400 });
        }
    } else {
        return NextResponse.json({ message: 'Invalid credentials', success : false }, { status: 400 });
    }
}