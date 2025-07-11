"use client"

import { useEffect, useState } from "react"

interface PetroData {
  State: string
  Region: string
  Period: string
  PMS: number
  AGO: number
  DPK: number
  LPG: number
}

export default function ReportTable() {
  const [data, setData] = useState<PetroData[]>([])
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState("All")
  const [stateFilter, setStateFilter] = useState("All")

  useEffect(() => {
    fetch("/data/petrodata_mock.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const latestDate = Array.from(new Set(data.map(d => d.Period))).sort().pop()
  const latestData = data.filter(d => d.Period === latestDate)

  const regions = ["All", ...Array.from(new Set(latestData.map(d => d.Region)))]
  const states = ["All", ...Array.from(new Set(
    latestData
      .filter(d => regionFilter === "All" || d.Region === regionFilter)
      .map(d => d.State)
  ))]

  const filtered = latestData.filter(d => {
    return (
      d.State.toLowerCase().includes(search.toLowerCase()) &&
      (regionFilter === "All" || d.Region === regionFilter) &&
      (stateFilter === "All" || d.State === stateFilter)
    )
  })

  return (
    <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Weekly Price Report ({latestDate})
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by state..."
            className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            value={regionFilter}
            onChange={e => {
              setRegionFilter(e.target.value)
              setStateFilter("All")
            }}
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
          >
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">PMS</th>
              <th className="px-4 py-2">AGO</th>
              <th className="px-4 py-2">DPK</th>
              <th className="px-4 py-2">LPG</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100"
              >
                <td className="px-4 py-2">{item.State}</td>
                <td className="px-4 py-2">{item.Region}</td>
                <td className="px-4 py-2">₦{item.PMS}</td>
                <td className="px-4 py-2">₦{item.AGO}</td>
                <td className="px-4 py-2">₦{item.DPK}</td>
                <td className="px-4 py-2">₦{item.LPG}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
