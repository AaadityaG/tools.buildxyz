import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Bricolage_Grotesque } from "next/font/google";
const brigo = Bricolage_Grotesque({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <div className={`container mx-auto p-4 h-screen flex items-center justify-center ${brigo.className}`}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Comming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {/* <p className="mb-4">Explore our tools </p> */}
          <Link href="/tools" className="text-blue-500 hover:underline">
            Untill Checkout Tools
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

