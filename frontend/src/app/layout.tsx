import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Scheduler & Automation System',
  description: 'A mini job scheduling and automation system built for Dotix Technologies',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}