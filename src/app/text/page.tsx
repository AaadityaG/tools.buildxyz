import InfoCard from "@/components/InfoCard";

const tools = [
  {
    title: "Guideline Caption Generator",
    description: "Generate captions with modified words to meet guidelines",
    href: "/text/guideline-caption-generator",
  },
];

export default function TextPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text Tools</h1>
        {tools.map((tool) => (
          <InfoCard
            key={tool.href}
            title={tool.title}
            description={tool.description}
            href={tool.href}
          />
        ))}
    </div>
  );
}
