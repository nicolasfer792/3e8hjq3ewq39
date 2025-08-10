import { Badge } from "@/components/ui/badge"

export function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-emerald-100 text-gray-800 hover:bg-emerald-100">Libre</Badge>
      <Badge className="bg-orange-100 text-gray-800 hover:bg-orange-100">Interesado</Badge>
      <Badge className="bg-yellow-100 text-gray-800 hover:bg-yellow-100">Señado</Badge>
      <Badge className="bg-rose-100 text-gray-800 hover:bg-rose-100">Confirmado</Badge>
    </div>
  )
}
