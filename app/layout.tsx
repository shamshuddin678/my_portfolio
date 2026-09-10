import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Shamshuddin Shaik — Python Backend Developer',
  description: 'Step into my workspace. I’m Shamshuddin Shaik, a Python Backend Developer focused on clean APIs, thoughtful data design, and reliable services. Explore my skills in Python, Django, FastAPI, PostgreSQL, and more.',
  openGraph: {
    title: 'Shamshuddin Shaik — Python Backend Developer',
    description: 'Clean code. Solid foundations. Explore my interactive developer workspace and Python backend toolkit.',
    type: 'website',
  },
}
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#101c24', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`dark bg-background ${geist.variable} ${geistMono.variable}`}><body className="font-sans antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
