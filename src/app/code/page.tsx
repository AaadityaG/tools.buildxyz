
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function CodePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Tools</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/code/twitter-card-preview" className="block">
          <Card>
            <CardHeader>
              <CardTitle>X/Twitter Card Preview</CardTitle>
              <CardDescription>Checkout if your url has a preview of image, description and title before posting on twitter/X.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

