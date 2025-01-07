import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function AudioPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Tools</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/image/image-convertor" className="block">
          <Card>
            <CardHeader>
              <CardTitle>Image Convertor</CardTitle>
              <CardDescription>Convert any type of images like png, jpg, jpeg and more</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

