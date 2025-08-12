import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AtilaProvider } from "@/store/atila-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Atila Salón - Dashboard de Reservas",
  description: "Sistema de gestión de reservas para Atila Salón de Fiestas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AtilaProvider>
          <div className="min-h-screen bg-background">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <div className="font-semibold text-lg">Atila Salón</div>
              </div>
            </header>
            <main className="container py-6">{children}</main>
          </div>
        </AtilaProvider>
        <Toaster />
      </body>
    </html>
  )
}
