import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PetroData",
  description: "Nigeria Petroleum Price Analysis Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
            {/* Sidebar */}
            <Sidebar />
            <main className="p-1 md:ml-[230px] ml-[110px]">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
