"use client"

import { useEffect, useState } from "react"
import LineChart from "./LineChart"
import { Download } from "lucide-react"

type Product = typeof products[number]
type Range = typeof ranges[number]

const products = ["AGO", "PMS", "DPK", "LPG"] as const
const ranges = ["1D", "1W", "1M", "3M", "6M", "ALL"] as const

// ✅ Typed data model for JSON
interface PetroData {
  State: string
  Region: string
  Period: string
  PMS: number
  AGO: number
  DPK: number
  LPG: number
}

export default function RetailPriceChartCard() {
  const [data, setData] = useState<PetroData[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>("PMS")
  const [selectedRange, setSelectedRange] = useState<Range>("1W")
  const [region, setRegion] = useState("All")
  const [state, setState] = useState("All")

  useEffect(() => {
    fetch("/data/petrodata_mock.json")
      .then((res) => res.json())
      .then(setData)
  }, [])

  const regions = ["All", ...Array.from(new Set(data.map((d) => d.Region)))]
  const states = [
    "All",
    ...Array.from(
      new Set(
        data
          .filter((d) => region === "All" || d.Region === region)
          .map((d) => d.State)
      )
    ),
  ]

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-sm w-full">
      {/* Title & Product Tabs */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Retail Price Analysis
          </h2>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white">
            <Download size={16} />
          </button>
        </div>

        <div className="flex gap-2">
          {products.map((p) => (
            <button
              key={p}
              className={`px-4 py-2 text-sm rounded-full font-medium transition ${
                selectedProduct === p
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white"
              }`}
              onClick={() => setSelectedProduct(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <LineChart
        product={selectedProduct}
        data={data}
        region={region}
        state={state}
        range={selectedRange}
      />

      {/* Date Range Tabs */}
      <div className="flex gap-3 my-4">
        {ranges.map((range) => (
          <button
            key={range}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              selectedRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white"
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Region & State Filters */}
      <div className="flex gap-4 flex-wrap mt-4">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value)
            setState("All")
          }}
          className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
