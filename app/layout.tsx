import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shortcut URL',
  description: 'URL shortner fast and simple by design',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
