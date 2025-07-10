import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { language } = await request.json()
        
        if (!['id', 'en'].includes(language)) {
            return NextResponse.json(
                { error: 'Invalid language' },
                { status: 400 }
            )
        }

        const response = NextResponse.json({ success: true })
        response.cookies.set('language', language, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        })

        return response
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to set language' },
            { status: 500 }
        )
    }
}
