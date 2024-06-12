import { query } from '@/app/config/db';
import { NextResponse } from 'next/server';

export async function GET(req : Request){
    const results = await query({
        query : 'SELECT * FROM posts',
        values : [],
    });

    return NextResponse.json({ results : results}, {status : 200})
}

