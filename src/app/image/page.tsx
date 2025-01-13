
import InfoCard from "@/components/InfoCard"
export default function AudioPage() {

  const tools = [
    {
      title: "Youtube Thumbnail Downloader",
      description: "Download high-quality thumbnails from YouTube videos",
      href: "/image/youtube-thumbnail-downloader",
    },
  ];


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Tools</h1>
      {tools.map((tool) => (
          <InfoCard
            key={tool.href}
            title={tool.title}
            description={tool.description}
            href={tool.href}
          />
        ))}
    </div>
  )
}

