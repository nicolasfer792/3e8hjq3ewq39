"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/date-utils"
import type { Reservation } from "@/lib/types"
import { useAtila } from "@/store/atila-provider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

type Props = {
  date: string
  reservations: Reservation[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationDetailsDialog({ date, reservations, open, onOpenChange }: Props) {
  const { enviarReservaAPapelera, refresh } = useAtila()

  const handleTrash = async (id: string) => {
    await enviarReservaAPapelera(id)
    refresh() // Refrescar el estado global para que el calendario se actualice
    onOpenChange(false) // Cerrar el diálogo
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles de Reservas para {date}</DialogTitle>
          <DialogDescription>Aquí puedes ver y gestionar las reservas para esta fecha.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {reservations.length === 0 ? (
            <p className="text-muted-foreground">No hay reservas activas para esta fecha.</p>
          ) : (
            reservations.map((r) => (
              <div key={r.id} className="border rounded-md p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{r.nombreCliente}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.estado === "señado"
                        ? "bg-yellow-100 text-yellow-800"
                        : r.estado === "confirmado"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {r.estado.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personas: {r.cantidadPersonas} • Total: {formatCurrency(r.total)}
                </p>
                {r.notas && <p className="text-sm italic text-muted-foreground">Notas: {r.notas}</p>}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="mt-2">
                      <Trash2 className="mr-2 h-4 w-4" /> Enviar a Papelera
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción enviará la reserva de {r.nombreCliente} a la papelera. Podrás recuperarla desde la
                        sección "Papelera" en los próximos 7 días, después de los cuales se eliminará permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleTrash(r.id)}>Sí, enviar a papelera</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
