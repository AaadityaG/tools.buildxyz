"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

interface VideoData {
  title: string;
  thumbnail: string;
  videoId: string;
  qualities: {
    label: string;
    url: string;
  }[];
}



const Index = () => {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);


  function isValidYouTubeUrl(url: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidYouTubeUrl(url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast.error("Could not extract video ID from URL");
      return;
    }

    setLoading(true);
    try {
      // Get the video title from oEmbed API
      const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      
      const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      setVideoInfo({
        title: data.title,
        thumbnail: maxResUrl,
        videoId: videoId,
        qualities: [
          {
            label: "Max Resolution",
            url: maxResUrl
          }
        ]
      });
      
      // Automatically trigger download
      const link = document.createElement('a');
link.download = `${data.title}-maxres.jpg`;
document.body.appendChild(link);
document.body.removeChild(link);

      
      toast.success("Thumbnail downloaded!");
    } catch (error) {
      toast.error("Failed to fetch video information");
      console.error("Error fetching video info:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Thumbnail Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Download high-quality thumbnails from YouTube videos
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="Paste YouTube URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                className="gradient-bg hover-scale text-white"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Thumbnail"}
              </Button>
            </div>
          </form>

          {videoInfo && <VideoInfo info={videoInfo} />}
        </div>
      </div>
    </div>
  );
};

export default Index;


interface VideoInfoProps {
  info: {
    title: string;
    thumbnail: string;
    videoId: string;
    qualities: {
      label: string;
      url: string;
    }[];
  };
}
const VideoInfo = ({ info }: VideoInfoProps) => {
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = info.thumbnail;
      link.download = `${info.title}-thumbnail.jpg`; // Specify the filename
      document.body.appendChild(link); // Append link to body
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link after download
    };
  
    return (
      <div className="mt-8 space-y-6">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={info.thumbnail}
            alt={info.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${info.videoId}/hqdefault.jpg`;
            }}
          />
        </div>
  
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">{info.title}</h2>
  
          <div className="flex gap-4">
            {/* Open Thumbnail in New Tab */}
            <Button
            //   onClick={handleOpenNewTab}
              className="text-white px-4 py-2 rounded-lg"
            >
              URL <Share2 />
            </Button>
  
            {/* Download the Thumbnail */}
            <Button
              onClick={handleDownload}
              className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
            >
              Download Thumbnail
            </Button>
          </div>
        </div>
      </div>
    );
  };
  