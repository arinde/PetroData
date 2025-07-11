# PetroData 🛢️📊

**PetroData** is a modern, responsive dashboard for analyzing petroleum product retail price trends across Nigerian states and regions. It supports product-specific filtering, regional insights, time-based analysis, and a clean dark/light UI — all inspired by the provided Figma design.

Live Demo: [https://petro-data.vercel.app](https://petro-data.vercel.app)

---

## 📌 Project Description

This dashboard was built as part of a frontend technical assessment. It showcases:

- 📈 Real-time retail price analysis of PMS, AGO, DPK, LPG
- 🌍 Region & State filtering
- 🌗 Dark and light mode support
- 🧭 Time range filtering: 1D, 1W, 1M, 3M, 6M, ALL
- 📥 Downloadable chart as PNG
- ⚡ Responsive layout with mobile-first design

---

## 🧠 Assumptions & Design Decisions

- Chart uses mock data (`/public/data/petrodata_mock.json`) and simulates time-based aggregation.
- Figma layout was interpreted for responsiveness, accessible tab switching, and real-world usability.
- Chart tooltips were added for better data visibility (even though not shown in Figma).
- Icons and layout sizes were matched closely using Tailwind and Lucide.
- Redirect from `/` to `/analysis` was handled in `app/page.tsx`.

---

## 🧑‍💻 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (for chart rendering)
- **html-to-image** (for PNG chart download)
- **Lucide-react** (icon set)
- **next-themes** (dark/light mode)

---

## 📁 Folder Structure


app/
├── page.tsx # Root route (redirects to /analysis)
├── layout.tsx # App layout with ThemeProvider
├── analysis/ # Main dashboard page
│ ├── layout.tsx
│ └── page.tsx
components/
├── AnalysisHeader.tsx
├── ProductCardBlock.tsx
├── RetailPriceChartCard.tsx
├── LineChart.tsx
public/
└── data/
└── petrodata_mock.json


---

## 📥 Installation & Running Locally

```bash
git clone https://github.com/arinde/PetroData.git
cd PetroData
npm install
npm run dev
Then open: http://localhost:3000

🚀 Live URL
🔗 https://petro-data.vercel.app