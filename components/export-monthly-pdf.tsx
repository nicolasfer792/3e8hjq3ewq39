"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAtila } from "@/store/atila-provider"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { formatCurrency } from "@/lib/date-utils"

export function ExportMonthlyPDF() {
  const { listReservationsByMonth } = useAtila()
  const [month, setMonth] = React.useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
  })
  const [loading, setLoading] = React.useState(false)

  const exportPdf = async () => {
    setLoading(true)
    try {
      const data = await listReservationsByMonth(month)
      const doc = new jsPDF()

      const title = `Reservas mensuales — Atila (${month})`
      doc.setFontSize(14)
      doc.text(title, 14, 16)

      const rows = data.map((r) => [
        r.fecha,
        r.nombreCliente,
        r.estado.toUpperCase(),
        String(r.cantidadPersonas),
        formatCurrency(r.total),
      ])

      const total = data.reduce((acc, r) => acc + r.total, 0)

      autoTable(doc, {
        head: [["Fecha", "Cliente", "Estado", "Personas", "Total"]],
        body: rows,
        startY: 22,
        theme: "grid",
      })

      const y = (doc as any).lastAutoTable?.finalY || 22
      doc.setFontSize(12)
      doc.text(`Total del mes: ${formatCurrency(total)}`, 14, y + 10)

      doc.save(`reservas-${month}.pdf`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end">
      <div>
        <label className="block text-sm mb-1">Mes</label>
        <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <Button onClick={exportPdf} disabled={loading}>
        {loading ? "Generando..." : "Descargar PDF mensual"}
      </Button>
    </div>
  )
}
