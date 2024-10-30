import './globals.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import type { ReactNode } from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    default: 'Home | UpLeveled',
    template: '%s | UpLeveled',
  },

  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <div>
            <nav>
              {/* This is not optimized */}
              {/* <a href="/about">About</a> */}

              {/* This is optimized */}
              <Link href="/">Home</Link>
              <Link href="/animals">Animals</Link>
              <Link href="/fruits">Fruits</Link>
              <Link href="/about">About</Link>

              <div>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </div>
            </nav>
            {Math.floor(Math.random() * 10)}
          </div>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
