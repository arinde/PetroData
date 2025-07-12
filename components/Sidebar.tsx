"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, ChartColumn, BookOpen, Sparkle, BookmarkMinus, Settings } from "lucide-react"

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard width={20} height={20} /> },
  { name: "Analysis", path: "/analysis", icon: <ChartColumn width={20} height={20}/> },
  { name: "News & Report", path: "/news", icon: <BookOpen width={20} height={20}/> },
  { name: "Exclusive Tab", path: "/exclusive", icon: <Sparkle width={20} height={20} /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkMinus width={20} height={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings width={20} height={20} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 z-50 space-y-32 w-[50px] lg:block md:w-[230px] h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white md:p-3 p-2 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <h1 className="text-2xl font-bold mt-6 tracking-wide flex items-center"><Image src="/images/Logo.png" alt="PetroData" width={32} height={32} /><span className="text-teal-500">Petro</span>Data</h1>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path)

          return (
            <Link
              key={item.path}
              href={item.path}
              className={` px-4 py-2 rounded-md text-sm font-medium flex items-center gap-x-3 transition ${
                isActive
                  ?  "text-teal-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}<span className="hidden md:flex">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
