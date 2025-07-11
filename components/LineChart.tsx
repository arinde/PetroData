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

type ChartDataItem = {
  Region: string
  State: string
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
  data: ChartDataItem[]
  region: string
  state: string
  range: string
}) {
  const filtered = useMemo(() => {
    const rows = data.filter(
      (d) =>
        (region === "All" || d.Region === region) &&
        (state === "All" || d.State === state)
    )

    const grouped = rows.reduce((acc: Record<string, number[]>, item) => {
      if (!acc[item.Period]) acc[item.Period] = []
      acc[item.Period].push(item[product])
      return acc
    }, {})

    const chart = Object.entries(grouped)
      .map(([date, values]) => ({
        date,
        value: Number(
          (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Simulated range filtering
    const sliceMap: Record<string, number> = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      ALL: chart.length,
    }

    return chart.slice(-sliceMap[range])
  }, [data, product, region, state, range])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={filtered}>
        <XAxis dataKey="date" axisLine stroke="#ccc" tickLine={false} />
        <Tooltip
          wrapperStyle={{ backgroundColor: "#ffffff", borderRadius: 8 }}
          contentStyle={{ fontSize: "12px" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />
      </ReLineChart>
    </ResponsiveContainer>
  )
}
