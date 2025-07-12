"use client"

import { useState } from "react"
import Header from "@/components/Header"
import ProductCards from "@/components/ProductCards"
import ReportTable from "@/components/ReportTable"
import FlightAnalysis from "@/components/FlightAnalysis"
import DepotsAnalysis from "@/components/DepotsAnalysis"
import RetailPriceChartCard from "@/components/RetailPriceChartCard"

export default function AnalysisPage() {
  
  const [activeTab, setActiveTab] = useState("retail")

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "retail" && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <ProductCards />
            
             <RetailPriceChartCard />
            
          </div>

          <ReportTable />
        </div>
      )}

      {activeTab === "flight" && <FlightAnalysis />}
      {activeTab === "depots" && <DepotsAnalysis />}
     
    </>
  )
}
