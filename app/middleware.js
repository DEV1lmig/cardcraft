import { NextResponse } from 'next/server';
import jwtDecode from 'jwt-decode';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwtDecode(token);
    // Token is valid, proceed
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected'],
};