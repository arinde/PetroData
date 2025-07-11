import { redirect } from "next/navigation"

export default function Home() {
  if (typeof window === "undefined") {
    redirect("/analysis")
  }

  return (
    <meta httpEquiv="refresh" content="0; URL=/analysis" />
  )
}
