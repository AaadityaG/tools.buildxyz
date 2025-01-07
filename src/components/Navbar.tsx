

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

// import ShinyText from '../../components/ShinyText'
import ShinyText from './ShinyText'
// import GradientText from '../../components/GradientText'
import GradientText from './GradientText'

export default function Navbar() {
  // const { theme, setTheme } = useTheme()

  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <Link href="/" className="text-2xl font-bold">Toolit.</Link>

{/* <Link href={"/"}>
<GradientText
  colors={["#ff7c40", "#4079ff", "#ff7c40", "#4079ff", "#ff7c40"]}
  animationSpeed={3}
  showBorder={true}
  className="p-2 px-4 bg-transparent"
>
 by Buildxyz
</GradientText>
</Link> */}

     
    </nav>
  )
}

