// components/RetailPriceChartCard.tsx
"use client"

import { useEffect, useState } from "react"
import LineChart from "./LineChart" // Assuming this is your ProductPriceChart component
import { Download } from "lucide-react"

type Product = typeof products[number]
type Range = typeof ranges[number]

const products = ["AGO", "PMS", "DPK", "LPG"] as const
const ranges = ["1D", "1W", "1M", "3M", "6M", "ALL"] as const

// Define the expected data structure for the chart
// This matches the data in 'product_prices.json'
interface PetroData {
  State: string
  Region: string
  Period: string // Expected date string for the X-axis
  PMS: number // Expected price for PMS
  AGO: number // Expected price for AGO
  DPK: number // Expected price for DPK
  LPG: number // Expected price for LPG
}

export default function RetailPriceChartCard() {
  const [data, setData] = useState<PetroData[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>("PMS")
  const [selectedRange, setSelectedRange] = useState<Range>("1W")
  const [region, setRegion] = useState("All")
  const [state, setState] = useState("All")

  useEffect(() => {
    // This component fetches data client-side from the public directory.
    // It expects the file 'product_prices.json' to exist in 'public/data/'
    // because its internal logic (PetroData interface, product filtering)
    // is designed for that data structure.
    fetch("/data/product_prices.json")
      .then((res) => {
        if (!res.ok) {
          // Log specific error if the file isn't found or other network issue
          throw new Error(`HTTP error! status: ${res.status} from ${res.url}`);
        }
        return res.json();
      })
      .then(setData)
      .catch((error) => {
        console.error("Failed to fetch product prices data:", error);
        // You might want to set an error state here to display a message to the user
      });
  }, [])

  // Derive unique regions and states from the fetched data
  // These will be empty until data is loaded
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

      {/* Line Chart Component */}
      {/* It expects data with 'Period', and product-specific number fields */}
      {/* Ensure your LineChart component is set up to consume this data correctly */}
      <LineChart
        product={selectedProduct}
        data={data}
        region={region}
        state={state}
        range={selectedRange}
      />

      {/* Date Range Tabs */}
      <div className="flex items-center justify-evenly gap-x-2 my-4">
        {ranges.map((range) => (
          <button
            key={range}
            className={`text-xs px-2 py-1 font-medium rounded-md transition ${
              selectedRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white"
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}

          <div className="flex items-center gap-1 mt-4">
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value)
              setState("Region")
            }}
            className="px-3 py-2 text-sm  rounded-md border-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
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
      
    </div>
  )
}