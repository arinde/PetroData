"use client"

import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts"
import { useMemo } from "react"

type Product = "PMS" | "AGO" | "DPK" | "LPG"

interface PetroData {
  State: string
  Region: string
  Period: string
  PMS: number
  AGO: number
  DPK: number
  LPG: number
}

export default function LineChart({
  product,
  data,
  region,
  state,
  range,
}: {
  product: Product
  data: PetroData[]
  region: string
  state: string
  range: string
}) {
  const filtered = useMemo(() => {
    const filteredRows = data.filter(
      (d) =>
        (region === "Region" || d.Region === region) &&
        (state === "State" || d.State === state)
    )

    const grouped = filteredRows.reduce((acc: Record<string, number[]>, item) => {
      if (!acc[item.Period]) acc[item.Period] = []
      acc[item.Period].push(item[product])
      return acc
    }, {})

    const chartData = Object.entries(grouped)
      .map(([date, values]) => ({
        date,
        value: Number(
          (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const limitMap: Record<string, number> = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "ALL": chartData.length,
    }

    return chartData.slice(-limitMap[range])
  }, [data, product, region, state, range])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReLineChart data={filtered}>
        <XAxis dataKey="date" axisLine stroke="#ccc" tickLine={false} />
        <Tooltip
          wrapperStyle={{ backgroundColor: "#ffffff", borderRadius: 8 }}
          contentStyle={{ fontSize: "12px" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#38b2ac"
          strokeWidth={3}
          dot={false}
        />
      </ReLineChart>
    </ResponsiveContainer>
  )
}
