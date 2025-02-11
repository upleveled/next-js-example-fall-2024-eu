import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
}

export const secureCookieOptions = {
  maxAge: 60 * 60 * 24, // Cookie expires in 24 hours
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax', // Prevent sending cookie with images or frames of your content originating on other websites
} as const;
