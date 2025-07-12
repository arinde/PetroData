// components/RetailPriceChartCard.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import LineChart from "./LineChart"
import { Download } from "lucide-react"
import { toPng } from "html-to-image"

const products = ["AGO", "PMS", "DPK", "LPG"] as const
const ranges = ["1D", "1W", "1M", "3M", "6M", "ALL"] as const

interface PetroData {
  State: string
  Region: string
  Period: string
  PMS: number
  AGO: number
  DPK: number
  LPG: number
}

type Product = typeof products[number]
type Range = typeof ranges[number]

export default function RetailPriceChartCard() {
  const [data, setData] = useState<PetroData[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>("PMS")
  const [selectedRange, setSelectedRange] = useState<Range>("1W")
  const [region, setRegion] = useState("Region")
  const [state, setState] = useState("State")
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/data/petrodata_mock.json")
      .then((res) => res.json())
      .then(setData)
  }, [])

  const downloadChart = () => {
    if (!chartRef.current) return
    toPng(chartRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = `${selectedProduct.toLowerCase()}-price-chart.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => console.error("Download failed", err))
  }

  const regions = ["Region", ...Array.from(new Set(data.map((d) => d.Region)))]
  const states = [
    "State",
    ...Array.from(
      new Set(
        data
          .filter((d) => region === "Region" || d.Region === region)
          .map((d) => d.State)
      )
    ),
  ]

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-sm md:w-1/2 w-full">
      {/* Title & Tabs */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Retail Price Analysis
          </h2>
          <button
            onClick={downloadChart}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white"
          >
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

      {/* Chart */}
      <div ref={chartRef} className="bg-white dark:bg-[#1E293B] p-4 rounded-md">
        <LineChart
          product={selectedProduct}
          data={data}
          region={region}
          state={state}
          range={selectedRange}
        />
      </div>

      {/* Time Range Tabs */}
      <div className="flex flex-wrap gap-y-2 items-center justify-evenly gap-x-1">
        {ranges.map((range) => (
          <button
            key={range}
            className={`px-1 py-1 text-xs font-medium rounded-md transition ${
              selectedRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white"
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}

        <div className="flex gap-x-2 items-center">
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value)
              setState("All")
            }}
            className="w-20 text-sm outline-none rounded-md border-0 bg-none dark:bg-gray-800 text-gray-800 dark:text-white"
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
            className="w-16 text-sm rounded-md border-0 outline-none  bg-none dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      
    </div>
  )
}
