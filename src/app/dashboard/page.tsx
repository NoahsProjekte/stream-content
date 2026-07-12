import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'
import Link from 'next/link'
import Image from 'next/image'
import RankBadge, { type RankTier } from '@/components/RankBadge'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Extract Discord user metadata
  const discordMeta = user?.user_metadata ?? {}
  const displayName: string =
    discordMeta.full_name ??
    discordMeta.name ??
    discordMeta.global_name ??
    discordMeta.username ??
    'Streamer'
  const avatarUrl: string | null = discordMeta.avatar_url ?? null
  const discordUsername: string | null =
    discordMeta.custom_claims?.global_name ??
    discordMeta.provider_id ??
    null

  // Placeholder rank — in production derive this from your DB
  const userRank: RankTier = 'gold'

  const allRanks: RankTier[] = [
    'iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster',
  ]

  // Placeholder content items
  const contentItems = [
    { id: 1, title: 'Friday Night Highlights', type: 'VOD', status: 'Planned', date: 'Jul 18' },
    { id: 2, title: 'New Game Preview Stream', type: 'Live', status: 'Scheduled', date: 'Jul 20' },
    { id: 3, title: 'Q&A with Community', type: 'Live', status: 'Draft', date: 'Jul 25' },
  ]

  const statusColors: Record<string, string> = {
    Planned: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Scheduled: 'bg-green-500/10 text-green-400 border-green-500/20',
    Draft: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Published: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  const typeColors: Record<string, string> = {
    VOD: 'bg-orange-500/10 text-orange-400',
    Live: 'bg-red-500/10 text-red-400',
    Clip: 'bg-cyan-500/10 text-cyan-400',
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Top navigation bar */}
      <nav className="sticky top-0 z-20 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center group-hover:bg-[#4752C4] transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-white hidden sm:block">Stream Content</span>
          </Link>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-1">
            {['Dashboard', 'Content', 'Schedule', 'Analytics'].map((item) => (
              <button
                key={item}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  item === 'Dashboard'
                    ? 'bg-[#5865F2]/10 text-[#5865F2]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full ring-2 ring-[#5865F2]/30"
                  unoptimized
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-sm font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-300 hidden sm:block max-w-[120px] truncate">
                {displayName}
              </span>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-gray-400 hover:text-white hover:border-red-500/30 hover:bg-red-500/5 text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full ring-2 ring-[#5865F2]/40 ring-offset-2 ring-offset-[#0f0f0f]"
                unoptimized
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5865F2] to-[#a78bfa] flex items-center justify-center text-white text-xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {displayName.split(' ')[0]}
                </h1>
                <RankBadge tier={userRank} size="md" />
              </div>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                {/* Discord icon inline */}
                <svg className="w-3.5 h-3.5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Connected via Discord
                {discordUsername && (
                  <span className="text-gray-600"> &middot; @{discordUsername}</span>
                )}
              </p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-[#5865F2]/20">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Content
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Content', value: '24', icon: '📄', delta: '+3 this week' },
            { label: 'Scheduled', value: '6', icon: '📅', delta: 'Next: Jul 20' },
            { label: 'Published', value: '18', icon: '✅', delta: 'All time' },
            { label: 'Draft', value: '3', icon: '✏️', delta: 'In progress' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#5865F2]/20 transition-colors"
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* Ranks showcase */}
        <div className="mb-8 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2e2e2e]">
            <h2 className="font-semibold text-white text-sm">Ranks</h2>
            <span className="text-xs text-gray-600">Your current rank is highlighted</span>
          </div>
          <div className="px-5 py-4 flex flex-wrap gap-3">
            {allRanks.map((tier) => (
              <div
                key={tier}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  tier === userRank
                    ? 'bg-[#242424] ring-1 ring-[#2e2e2e]'
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <RankBadge tier={tier} size="lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Stream Content — main card */}
          <div className="lg:col-span-2 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2e2e2e]">
              <h2 className="font-semibold text-white">Your Stream Content</h2>
              <button className="text-xs text-[#5865F2] hover:text-[#4752C4] font-medium transition-colors">
                View all
              </button>
            </div>

            <div className="divide-y divide-[#2e2e2e]">
              {contentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-[#242424] transition-colors group"
                >
                  {/* Thumbnail placeholder */}
                  <div className="w-10 h-10 rounded-lg bg-[#2e2e2e] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5865F2]/10 transition-colors">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-[#5865F2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.date}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${typeColors[item.type] ?? 'bg-gray-500/10 text-gray-400'}`}>
                      {item.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${statusColors[item.status] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {item.status}
                    </span>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#2e2e2e] text-gray-400 hover:text-white">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Empty state hint */}
              <div className="px-5 py-6 text-center">
                <p className="text-gray-600 text-sm">
                  This is placeholder data.{' '}
                  <span className="text-[#5865F2] cursor-pointer hover:underline">
                    Connect your data source
                  </span>{' '}
                  to see real content.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Quick actions */}
            <div className="rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#2e2e2e]">
                <h2 className="font-semibold text-white text-sm">Quick Actions</h2>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {[
                  {
                    label: 'Schedule a stream',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Add content idea',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    ),
                  },
                  {
                    label: 'View analytics',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    ),
                  },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#242424] transition-colors text-sm text-left w-full"
                  >
                    <span className="text-[#5865F2]">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Account info card */}
            <div className="rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#2e2e2e]">
                <h2 className="font-semibold text-white text-sm">Account</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Connected to Discord</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Email</span>
                    <span className="text-gray-300 text-xs font-mono truncate max-w-[140px]">
                      {user?.email ?? 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Provider</span>
                    <span className="text-[#5865F2] text-xs font-medium">Discord</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Member since</span>
                    <span className="text-gray-300 text-xs">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Today'}
                    </span>
                  </div>
                </div>

                <form action={signOut} className="mt-5">
                  <button
                    type="submit"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#2e2e2e] text-gray-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 text-xs font-medium transition-all duration-200 cursor-pointer"
                  >
                    Sign out of account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
