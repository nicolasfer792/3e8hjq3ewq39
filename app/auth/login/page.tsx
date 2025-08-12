import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  const userId = cookieStore.get("admin_user_id")
  const loginTime = cookieStore.get("admin_login_time")

  // Si tiene todas las cookies y no han expirado, redirigir al dashboard
  if (session && userId && loginTime) {
    const loginTimestamp = Number.parseInt(loginTime.value)
    const fourDaysInMs = 4 * 24 * 60 * 60 * 1000
    const isExpired = Date.now() - loginTimestamp > fourDaysInMs

    if (!isExpired) {
      redirect("/")
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#161616]">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  )
}