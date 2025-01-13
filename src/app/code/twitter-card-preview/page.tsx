"use client"

import { useState, useEffect } from "react";
import { VerifiedIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const twitterCardPreview = () => {
  const [previewURL, setPreviewURL] = useState("https://example.com");

  const handleURLSubmit = (url: string) => {
    console.log("URL submitted:", url);
    setPreviewURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Twitter Card Previewer</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Paste your website URL to see how it would appear in a tweet
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <URLInput onURLSubmit={handleURLSubmit} />
          <TwitterPreview url={previewURL} />
        </div>
      </div>
    </div>
  );
};

export default twitterCardPreview;



interface URLInputProps {
  onURLSubmit: (url: string) => void;
}

export const URLInput = ({ onURLSubmit }: URLInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting URL:", inputValue);

    try {
      // Basic URL validation
      new URL(inputValue);
      onURLSubmit(inputValue);
    } catch (err) {
      console.error("Invalid URL:", err);
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-[598px]">
      <Input
        type="url"
        placeholder="Paste your website URL here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="w-full sm:w-auto">Preview</Button>
    </form>
  );
};



interface TwitterPreviewProps {
  url: string;
}

interface MetaData {
  title: string;
  description: string;
  image: string;
}

export const TwitterPreview = ({ url }: TwitterPreviewProps) => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<MetaData>({
    title: "Website Title",
    description: "This is a description of the website that would appear in the meta tags.",
    image: "/placeholder.svg"
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!url) return;
      
      setLoading(true);
      console.log("Fetching metadata for URL:", url);
      
      try {
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        console.log("Metadata response:", data);
        
        if (data.status === 'success') {
          setMetadata({
            title: data.data.title || "No title available",
            description: data.data.description || "No description available",
            image: data.data.image?.url || "/placeholder.svg"
          });
        } else {
          throw new Error('Failed to fetch metadata');
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        toast({
          title: "Error",
          description: "Failed to fetch website preview",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url, toast]);

  return (
    <div className="w-full max-w-[598px] border border-gray-300 rounded-xl p-3 sm:p-4 font-sans ">
      {/* Tweet Header */}
      <div className="flex items-center   ">
        
        <div className="flex-1 min-w-0">
        <div className="flex items-center justify-start gap-3">

        <img
          src="https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg"
          alt="Twitter Profile"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <div className="flex flex-col items-start justify-start gap-0 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">

            <span className="font-bold text-[14px] sm:text-[15px] hover:underline cursor-pointer">
              Twitter
            </span>
            <VerifiedIcon className="w-4 h-4 text-twitter-blue" />
            <span className="text-twitter-gray text-[14px] sm:text-[15px] ml-1">@Twitter</span>
          </div>

          {/* Tweet Content */}
          <p className="text-[14px] sm:text-[15px] mt-1 text-left break-words">
            Check out this website! {url}
          </p>
          </div>

          </div>
          
          
          
          {/* Link Preview Card */}
          <div className="mt-3  rounded-xl overflow-hidden   ">
            {loading ? (
              <div className="h-[200px] sm:h-[250px] flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-twitter-blue" />
              </div>
            ) : (
              <>
                <img
                  src={metadata.image}
                  alt=" "
                  className="w-full h-[200px] sm:h-[250px] object-cover bg-gray-100 border"
                />
                <div className="p-2 sm:p-3">
                  <div className="text-[14px] sm:text-[15px] font-bold text-black text-left line-clamp-1">{metadata.title}</div>
                  <div className="text-[13px] sm:text-[15px] text-twitter-gray mt-1 text-left line-clamp-2">
                    {metadata.description}
                  </div>
                  <div className="text-twitter-gray text-[13px] sm:text-[15px] mt-1 flex items-center gap-2">
                    🌐 {new URL(url || "https://example.com").hostname}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Tweet Actions */}
          <div className="flex justify-between mt-3 text-gray-500 max-w-full px-2">
            <button className="flex items-center gap-1 sm:gap-2 hover:text-twitter-blue text-[13px] sm:text-[15px]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
              </svg>
              <span>24</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 hover:text-green-500 text-[13px] sm:text-[15px]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
              </svg>
              <span>100</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 hover:text-pink-600 text-[13px] sm:text-[15px]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
              </svg>
              <span>1.2K</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 hover:text-twitter-blue text-[13px] sm:text-[15px]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};