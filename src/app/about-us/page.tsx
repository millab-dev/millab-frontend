import AboutUs from "@/components/aboutus"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | MIL Lab",
  description: "Learn more about MIL Lab Indonesia and our mission.",
}

export default function AboutUsPage() {
  return <AboutUs />
}
