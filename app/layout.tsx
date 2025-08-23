import type { Metadata } from "next";
import "./globals.css";
import { Google_Sans_Code } from 'next/font/google';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import Footer from './components/Footer/Footer'


export const metadata: Metadata = {
  title: "currents school",
  description: "a diy film school",
};

const googleSans = Google_Sans_Code({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={googleSans.className}>
       <HamburgerMenu /> {/* z-50 */}
        <main className="relative">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
