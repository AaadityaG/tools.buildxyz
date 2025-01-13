
import InfoCard from "@/components/InfoCard"
export default function AudioPage() {

  const tools = [
    {
      title: "",
      description: "",
      href: "",
    },
  ];


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Tools</h1>
      {/* {tools.map((tool) => (
          <InfoCard
            key={tool.href}
            title={tool.title}
            description={tool.description}
            href={tool.href}
          />
        ))} */}
    </div>
  )
}

