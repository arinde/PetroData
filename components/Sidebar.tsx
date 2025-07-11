"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analysis", path: "/analysis" },
  { name: "News & Report", path: "/news" },
  { name: "Exclusive Tab", path: "/exclusive" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "Settings", path: "/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-[250px] h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 tracking-wide flex items-center"><Image src="/images/Logo.png" alt="PetroData" width={32} height={32} /><span className="text-teal-500">Petro</span>Data</h1>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path)

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
