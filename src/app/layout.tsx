import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { ThemeProvider } from './components/ThemeProvider'
import { ThemeProvider } from './components/ThemeProvider'
import { Bricolage_Grotesque } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// const brigo = Inter({ subsets: ['latin'] })
const brigo = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tlt App',
  description: 'A simple app with tabs and theme switching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={brigo.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

