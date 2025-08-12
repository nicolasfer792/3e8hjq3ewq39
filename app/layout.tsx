import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
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
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="font-semibold">Atila Salón</div>
              </header>
              <main className="p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </AtilaProvider>
        <Toaster />
      </body>
    </html>
  )
}
