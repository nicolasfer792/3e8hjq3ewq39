import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session")
  const userId = request.cookies.get("admin_user_id")

  // Verificación básica de cookies
  const hasValidCookies = !!(session && userId)

  // Rutas que requieren autenticación
  const protectedPaths = ["/", "/finanzas", "/configuracion"]
  const isProtectedPath = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + "/"),
  )

  // Si está en una ruta protegida y no tiene cookies válidas, redirigir al login
  if (isProtectedPath && !hasValidCookies) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Si tiene cookies y trata de acceder al login, redirigir al dashboard
  if (request.nextUrl.pathname === "/auth/login" && hasValidCookies) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
