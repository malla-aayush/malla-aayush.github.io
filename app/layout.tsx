import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import RootLayoutClient from './layout-client'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Aayush Malla - Data Engineer",
  description: "Portfolio of Aayush Malla, Data Engineer specializing in Azure, PySpark, and Machine Learning",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayoutClient
      interVariable={inter.variable}
      poppinsVariable={poppins.variable}
    >
      {children}
    </RootLayoutClient>
  )
}
