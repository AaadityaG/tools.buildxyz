import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bricolage_Grotesque } from 'next/font/google'
import { FileTextIcon, ImageIcon, VideoIcon, FileAudioIcon, CodeIcon } from 'lucide-react'
import SpotlightCard from "./components/SpotlightCard"

const brigo = Bricolage_Grotesque({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <div className={`min-h-full flex flex-col justify-center ${brigo.className}`}>
      <div className="">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Toolit.</h1>
            <p className="text-xl md:text-2xl mb-8">Free, Secure & well categorized!</p>
            <p className="text-lg md:text-xl mb-8">
            One-Stop solution for all tools you need, designed to handle various types of data.
            </p>
          </div>
          
          <div className="flex w-full items-center justify-center lg:flex-nowrap md:flex-wrap flex-wrap gap-4 mb-12">
            <Link href={"/text"}>
            <SpotlightCard className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-lg">
              <FileTextIcon className="w-9 h-9 mb-2" />
              <span className="text-sm md:text-base">Text</span>
            </SpotlightCard>
            </Link>
            <Link href={"/image"}>
            <SpotlightCard className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-lg">
              <ImageIcon className="w-9 h-9 mb-2" />
              <span className="text-sm md:text-base">Image</span>
            </SpotlightCard>
            </Link>
            <Link href="/video">
            <SpotlightCard className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-lg">
            <VideoIcon className="w-9 h-9 mb-2" />
              <span className="text-sm md:text-base">Video</span>
            </SpotlightCard>
            </Link>
            <Link href="/audio">
            <SpotlightCard className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-lg">
              <FileAudioIcon className="w-9 h-9 mb-2" />
              <span className="text-sm md:text-base">Audio</span>
            </SpotlightCard>
            </Link>
            <Link href="/audio">
            <SpotlightCard className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-lg">
              <CodeIcon className="w-9 h-9 mb-2" />
              <span className="text-sm md:text-base">Code</span>
            </SpotlightCard>
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-lg md:text-xl mb-8">
              Whether you're working with text, images, videos, audio, or code, our Tools Hub has you covered. 
              Streamline your workflow and enhance your productivity with our user-friendly tools.
            </p>
            
            {/* <Link href="/text" passHref>
              <Button size="lg" className="font-semibold bg-white text-black hover:bg-gray-100">
                Explore Tools
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

