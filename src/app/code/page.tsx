import InfoCard from "@/components/InfoCard";

export default function CodePage() {

  const tools = [
    {
      title: "X/Twitter Card Preview",
      description: "Checkout if your url has a preview of image, description and title before posting on twitter/X.",
      href: "/code/twitter-card-preview",
    },
  ];

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Tools</h1>
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

