"use client"

import type React from "react"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { AuthProvider } from "@/components/auth/auth-provider"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
