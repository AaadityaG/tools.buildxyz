import Navbar from './components/Navbar'
import Tabs from './components/Tabs'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/ThemeProvider'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
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
          <main className="flex-1 overflow-y-auto ">
            {children}
          </main>
        </div>
        <div className="sm:hidden">
          <Tabs />
        </div>
      </div>
    </ThemeProvider>
    </body>
</html>
  )
}

