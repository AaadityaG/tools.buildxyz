import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toolit',
  description: 'A comprehensive suite of tools for text, image, video, audio, and code processing.',
  openGraph: {
    title: 'Toolit - Your One-Stop Solution for Data Processing',
    description: 'Free, secure, and well-categorized tools for text, image, video, audio, and code processing.',
    url: 'https://your-app-url.com',
    siteName: 'Toolit',
    images: [
      {
        url: 'https://your-app-url.com/globe.svg', // Static image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolit - Your One-Stop Solution for Data Processing',
    description: 'Free, secure, and well-categorized tools for text, image, video, audio, and code processing.',
    images: ['https://your-app-url.com/og-image.png'], // Static image
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
              <div className="hidden sm:block">
                <Tabs />
              </div>
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
            <div className="sm:hidden">
              <Tabs />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
