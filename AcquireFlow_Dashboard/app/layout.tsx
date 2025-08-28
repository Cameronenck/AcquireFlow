import type { Metadata } from 'next'
import './globals.css'
import { PipelineProvider } from '@/lib/contexts/PipelineContext'

export const metadata: Metadata = {
  title: 'AcquireFlow.ai - Real Estate Investment Dashboard',
  description: 'AI-powered real estate investment management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PipelineProvider>
          {children}
        </PipelineProvider>
      </body>
    </html>
  )
} 