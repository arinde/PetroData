"use client"

import { useEffect, useState } from "react"

type ProductKey = "PMS" | "AGO" | "DPK" | "LPG"

interface PetroData {
  State: string
  Region: string
  Period: string
  PMS: number
  AGO: number
  DPK: number
  LPG: number
}

const productDetails: Record<
  ProductKey,
  { name: string; color: string; fakeChange: number; fakeValue: number; color2: string; }
> = {
  PMS: { name: "Premium Motor Spirit", color: "text-green-700 bg-green-400", color2:"text-green-400", fakeChange: 0.09, fakeValue: 0.37 },
  AGO: { name: "Automotive Gas Oil", color: "text-red-700  bg-red-400", color2:"text-red-400", fakeChange: 0.34, fakeValue: 9.01 },
  DPK: { name: "Dual Purpose Kerosene", color: "text-red-700 bg-red-400", color2:"text-red-400", fakeChange: 0.92, fakeValue: 50.90 },
  LPG: { name: "Liquefied Petroleum Gas", color: "text-red-800 bg-red-400", color2:"text-red-400", fakeChange: 0.67, fakeValue: 36.10 },
  

}

export default function ProductCardBlock() {
  const [data, setData] = useState<PetroData[]>([])

  useEffect(() => {
    fetch("/data/petrodata_mock.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const latestDate = Array.from(new Set(data.map(d => d.Period))).sort().pop()
  const latestData = data.filter(d => d.Period === latestDate)

  const average = (key: ProductKey) =>
    (
      latestData.reduce((sum, row) => sum + row[key], 0) / latestData.length
    ).toFixed(2)

  return (
    <div className="bg-white dark:bg-[rgb(30,41,59)] rounded-xl md:p-6 py-4 px-3 shadow-sm w-full lg:w-1/2">
      <h3 className="text-md font-bold md:mb-12 mb-8 mt-4 text-gray-800 dark:text-white">
        Current Product Retail Prices
      </h3>

      <div className="space-y-4">
        {(Object.keys(productDetails) as ProductKey[]).map((key) => {
          const product = productDetails[key]

          return (
            <div
              key={key}
              className="flex md:justify-between justify-evenly space-x-2  items-center border-b pb-3 last:border-none"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <p className="text-sm font-semibold">{key}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product.name}
                </p>
              </div>

              <div className=" flex items-center md:space-x-3 space-x-1 ">
                <p className="font-medium text-sm text-center text-gray-800 dark:text-white">
                  ₦{average(key)}
                </p>
                <div className="flex justify-between items-center space-x-2">
                  <p className={`md:text-sm text-xs ${product.color2}`}>
                    {product.fakeValue > 0.37 ? "-" : "+"}
                    {product.fakeValue}
                  </p>
                  <p className={`text-xs ${product.color} border-0 md:px-1 px-0.5 py-0.5 rounded-3xl`}>
                    {product.fakeValue > 0.37 ? "-" : "+"}
                    {product.fakeChange}%

                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
