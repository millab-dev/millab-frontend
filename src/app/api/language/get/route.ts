import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const language = cookieStore.get('language')?.value || 'en'
    
    return NextResponse.json({ language })
}
