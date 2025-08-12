"use client"

import { useState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signInAdmin } from "@/lib/auth-actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#2b725e] hover:bg-[#235e4c] text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Iniciando sesión...
        </>
      ) : (
        "Iniciar Sesión"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, setState] = useState<{ success?: boolean; error?: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (state?.success) {
      router.push("/")
    }
  }, [state, router])

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await signInAdmin(state, formData)
        setState(result)
      } catch (error) {
        setState({ error: "Error al iniciar sesión" })
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-[#161616] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Atila Reservas</h1>
          <p className="text-lg text-gray-400">Acceso al panel de administración</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Usuario
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Atila30"
                required
                className="bg-[#1c1c1c] border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-[#1c1c1c] border-gray-800 text-white"
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}