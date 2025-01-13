'use client'

import { HomeIcon, Type, ImageIcon, VideoIcon, Headphones, Code } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  // { icon: HomeIcon, path: "/", match: /^\/tools\/?$/ },
  { icon: Type , path: "/text", match: /^\/tools\/text(\/.*)?$/ },
  { icon: ImageIcon, path: "/image" },
  { icon: VideoIcon, path: "/video" },
  { icon: Headphones, path: "/audio" },
  { icon: Code, path: "/code" },
]

export default function Tabs() {
  const pathname = usePathname()

  return (
    <div className="flex sm:flex-col sm:w-16 sm:h-full bg-muted">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.path}
          className={`flex-1 p-4 hover:bg-accent flex items-center justify-center sm:justify-start ${
            (tab.match ? tab.match.test(pathname) : pathname === tab.path) ? "bg-accent" : ""
          }`}
        >
          <tab.icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  )
}

