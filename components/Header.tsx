"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bell, Search, Sun, Moon } from "lucide-react"

const subNav = [
  { name: "Retail Price Analysis", key: "retail" },
  { name: "Flight Analysis", key: "flight" },
  { name: "Depots Analysis", key: "depots" },
  { name: "Power Analysis", key: "power" },
  { name: "Cargo Analysis", key: "cargo" },
  { name: "Raw Data", key: "raw" }
]

export default function AnalysisHeader({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (val: string) => void
}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="mb-6 mx-6">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:bg-[#0F172A] dark:text-white">Analysis</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white">
            <Search size={16} />
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md">
            Set Alert
          </button>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white">
            <Bell size={16} />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Sub-nav */}
      <nav className="flex mt-10">
        {subNav.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`mr-6 pt-2 text-sm font-medium transition ${
              activeTab === item.key
                ? "border-t-2 border-blue-600 border-t-blue-800 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  )
}
