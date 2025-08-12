"use client"

import React from "react"
import { ReservationCalendar } from "./reservation-calendar"
import { NewReservationForm } from "./new-reservation-form"
import { ReservationsList } from "./reservations-list"
import { ExportMonthlyPDF } from "./export-monthly-pdf"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpensesAndStats } from "./expenses-and-stats"
import { ConfigForm } from "./config-form"
import { TrashBin } from "./trash-bin"

export function Dashboard() {
  const [selectedDate, setSelectedDate] = React.useState<string>("")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reservas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
          <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
          <TabsTrigger value="papelera">Papelera</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="reservas" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 space-y-4">
              <ReservationCalendar onSelectDate={setSelectedDate} />
              <div className="rounded-md border p-3">
                <ExportMonthlyPDF />
              </div>
              <ReservationsList />
            </div>
            <div className="xl:col-span-1">
              <NewReservationForm defaultDate={selectedDate} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="finanzas">
          <ExpensesAndStats />
        </TabsContent>

        <TabsContent value="papelera">
          <TrashBin />
        </TabsContent>

        <TabsContent value="configuracion">
          <ConfigForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
