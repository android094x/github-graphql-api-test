import { NextRequest, NextResponse } from 'next/server'

const loginRequiredPages = ['/', '/profile']

export default function middleware(req: NextRequest) {
  if (loginRequiredPages.find((p) => p === req.nextUrl.pathname)) {
    const { origin } = req.nextUrl
    const token = req.cookies.AUTH_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect(`${origin}/login`)
    }
  }
}
