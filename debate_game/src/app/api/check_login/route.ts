'use server';
import { query } from '@/app/config/db';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

export async function GET(req : Request){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
        const getUserData = await query({
            query: 'SELECT * FROM users WHERE token = ?',
            values: [token],
        });

        const userData = getUserData as RowDataPacket[];

        if (userData.length > 0) {
            return NextResponse.json({ loggedIn: true, userId: userData[0].user_id, userName : userData[0].username }, { status: 200 });
        } else {
            return NextResponse.json({ loggedIn: false, message: 'Token not in DB!' }, { status: 200 });
        }

    } else {
        return NextResponse.json({ loggedIn: false, message: 'No Token Found!' }, { status: 200 });
    }
}