import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
// import { ThemeProvider } from '../components/ThemeProvider'
import { ThemeProvider } from '../components/ThemeProvider'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
        <div className="sm:hidden">
          <Tabs />
        </div>
      </div>
    </ThemeProvider>
  )
}

