import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function AudioPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Tools</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <Link href="/tools/text/guideline-caption-generator" className="block">
          <Card>
            <CardHeader>
              <CardTitle>Guideline Caption Generator</CardTitle>
              <CardDescription>Generate captions with modified words to meet guidelines</CardDescription>
            </CardHeader>
          </Card>
        </Link> */}
      </div>
    </div>
  )
}

