import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Windows Portfolio',
  description: 'Make your Portoflio that look like windows',
};

export default function RootLayout({ children }) {
  return (
    <html className="select-none" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
