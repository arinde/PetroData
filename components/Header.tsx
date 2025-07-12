"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bell, Search, Sun, Moon, Flame, PlaneTakeoff, Warehouse, Lightbulb, BriefcaseConveyorBelt, Database, AlarmClock } from "lucide-react"

const subNav = [
  { name: "Retail Price Analysis", key: "retail", icon: <Flame width={20} height={20} /> },
  { name: "Flight Analysis", key: "flight", icon: <PlaneTakeoff width={20} height={20} /> },
  { name: "Depots Analysis", key: "depots", icon: <Warehouse width={16} height={16} /> },
  { name: "Power Analysis", key: "power", icon: <Lightbulb width={18} height={18} /> },
  { name: "Cargo Analysis", key: "cargo", icon: <BriefcaseConveyorBelt width={16} height={16} /> },
  { name: "Raw Data", key: "raw", icon: <Database width={16} height={16} /> }
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
          <h1 className="text-2xl font-bold text-gray-800 dark:bg-none dark:text-white">Analysis</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-gray-300 dark:bg-gray-500 text-gray-600 dark:text-white">
            <Search size={16} />
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-900 text-sm rounded-2xl flex items-center gap-x-1">
            <AlarmClock size={16} />
            Set Alert
          </button>
          <button className="p-2 rounded-full bg-gray-300 dark:bg-gray-500 text-gray-900 dark:text-white">
            <Bell size={16} />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-500 text-gray-600 dark:text-white"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Sub-nav */}
      <nav className="flex flex-wrap space-x-2 mt-10">
        {subNav.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`md:mr-6 pt-2 text-xs font-normal border-0 flex items-center gap-x-1 transition ${
              activeTab === item.key
                ? "border-t-2 border-t-teal-500 text-teal-400"
                : "text-gray-200 hover:text-teal-600"
            }`}
          >
            {item.icon}{item.name}
          </button>
        ))}
      </nav>
    </div>
  )
}
