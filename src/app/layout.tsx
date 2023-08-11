import './reset.scss';
import './globals.scss';
import type { Metadata } from 'next';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt'>
      <meta charSet='UTF-8'></meta>
      <body className={pacifico.className}>{children}</body>
    </html>
  );
}
