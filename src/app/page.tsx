import { createClient } from '@/lib/supabase/server'
import { signInWithDiscord } from './actions'
import Link from 'next/link'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const hasError = searchParams.error === 'auth_failed'

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#5865F2] opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#5865F2] opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5865F2] opacity-[0.03] blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(88,101,242,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(88,101,242,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Stream Content
          </span>
        </div>

        {user ? (
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-gray-300 hover:text-white hover:border-[#5865F2]/50 text-sm font-medium transition-all duration-200"
          >
            Dashboard
          </Link>
        ) : (
          <div className="w-px h-4 bg-transparent" />
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-4 text-center pb-20">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
          Discord-powered streaming platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl">
          Your Stream Content,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #5865F2, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Organized
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Plan, manage, and schedule your stream content in one place. Connect
          with your Discord account to get started instantly.
        </p>

        {/* Error message */}
        {hasError && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-md w-full">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            Authentication failed. Please try again.
          </div>
        )}

        {/* CTA */}
        {user ? (
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5] text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-[#5865F2]/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <form action={signInWithDiscord}>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5] text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-[#5865F2]/25 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Discord SVG Logo */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Login with Discord
              </button>
            </form>
            <p className="text-gray-600 text-sm">
              Free to use. No credit card required.
            </p>
          </div>
        )}

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          {[
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
              ),
              title: 'Schedule Content',
              desc: 'Plan your stream schedule weeks in advance',
            },
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              ),
              title: 'Organize Ideas',
              desc: 'Keep all your content ideas in one dashboard',
            },
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: 'Discord Native',
              desc: 'Sign in instantly with your Discord account',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#5865F2]/30 transition-colors duration-200 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-3">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a1a] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Stream Content. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Built with Next.js, Supabase & Discord
          </p>
        </div>
      </footer>
    </div>
  )
}
