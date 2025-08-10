"use client"

import React from "react"
import { useAtila } from "@/store/atila-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ConfigForm() {
  const { state, guardarConfig } = useAtila()
  const [cfg, setCfg] = React.useState(state.config)

  React.useEffect(() => {
    setCfg(state.config)
  }, [state.config])

  const updateNumber = (key: keyof typeof cfg, value: number) => {
    setCfg((s) => ({ ...s, [key]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configuración de precios y gastos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Label>Base (entre semana)</Label>
            <Input
              type="number"
              value={cfg.baseEntreSemana}
              onChange={(e) => updateNumber("baseEntreSemana", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Base (fin de semana)</Label>
            <Input
              type="number"
              value={cfg.baseFinDeSemana}
              onChange={(e) => updateNumber("baseFinDeSemana", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Precio por persona (entre semana)</Label>
            <Input
              type="number"
              value={cfg.precioPorPersonaEntreSemana}
              onChange={(e) => updateNumber("precioPorPersonaEntreSemana", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Precio por persona (fin de semana)</Label>
            <Input
              type="number"
              value={cfg.precioPorPersonaFinDeSemana}
              onChange={(e) => updateNumber("precioPorPersonaFinDeSemana", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Costo fijo de limpieza</Label>
            <Input
              type="number"
              value={cfg.costoLimpiezaFijo}
              onChange={(e) => updateNumber("costoLimpiezaFijo", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium">Extras fijos</div>
          <div className="space-y-2">
            {cfg.extrasFijos.map((ex, idx) => (
              <div key={ex.id} className="grid grid-cols-5 gap-2">
                <Input
                  className="col-span-2"
                  value={ex.nombre}
                  onChange={(e) => {
                    const v = e.target.value
                    setCfg((s) => {
                      const updated = [...s.extrasFijos]
                      updated[idx] = { ...updated[idx], nombre: v }
                      return { ...s, extrasFijos: updated }
                    })
                  }}
                />
                <Input
                  type="number"
                  className="col-span-2"
                  value={ex.precio}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setCfg((s) => {
                      const updated = [...s.extrasFijos]
                      updated[idx] = { ...updated[idx], precio: v }
                      return { ...s, extrasFijos: updated }
                    })
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setCfg((s) => ({ ...s, extrasFijos: s.extrasFijos.filter((_, i) => i !== idx) }))
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => {
                setCfg((s) => ({
                  ...s,
                  extrasFijos: [...s.extrasFijos, { id: crypto.randomUUID(), nombre: "Nuevo extra", precio: 0 }],
                }))
              }}
            >
              Agregar extra
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium">Ítems por cantidad</div>
          <div className="space-y-2">
            {cfg.itemsPorCantidad.map((it, idx) => (
              <div key={it.id} className="grid grid-cols-5 gap-2">
                <Input
                  className="col-span-2"
                  value={it.nombre}
                  onChange={(e) => {
                    const v = e.target.value
                    setCfg((s) => {
                      const updated = [...s.itemsPorCantidad]
                      updated[idx] = { ...updated[idx], nombre: v }
                      return { ...s, itemsPorCantidad: updated }
                    })
                  }}
                />
                <Input
                  type="number"
                  className="col-span-2"
                  value={it.precioUnitario}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setCfg((s) => {
                      const updated = [...s.itemsPorCantidad]
                      updated[idx] = { ...updated[idx], precioUnitario: v }
                      return { ...s, itemsPorCantidad: updated }
                    })
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setCfg((s) => ({ ...s, itemsPorCantidad: s.itemsPorCantidad.filter((_, i) => i !== idx) }))
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => {
                setCfg((s) => ({
                  ...s,
                  itemsPorCantidad: [
                    ...s.itemsPorCantidad,
                    { id: crypto.randomUUID(), nombre: "Nuevo ítem", precioUnitario: 0 },
                  ],
                }))
              }}
            >
              Agregar ítem
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => guardarConfig(cfg)}>Guardar cambios</Button>
        </div>
      </CardContent>
    </Card>
  )
}
