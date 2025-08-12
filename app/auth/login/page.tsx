import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  const userId = cookieStore.get("admin_user_id")

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session && userId) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161616] px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
