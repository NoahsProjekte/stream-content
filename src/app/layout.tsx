import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stream Content',
  description: 'Manage and organize your stream content with ease.',
  keywords: ['streaming', 'content', 'discord', 'twitch'],
  authors: [{ name: 'Stream Content' }],
  openGraph: {
    title: 'Stream Content',
    description: 'Manage and organize your stream content with ease.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0f0f] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
