import React from 'react'

export type RankTier =
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'grandmaster'

interface RankConfig {
  label: string
  color: string
  glow: string
  tail: string
  tailFade: string
  border: string
  bg: string
}

const RANKS: Record<RankTier, RankConfig> = {
  iron: {
    label: 'Iron',
    color: 'text-[#8c8c8c]',
    glow: 'shadow-[0_0_8px_rgba(140,140,140,0.25)]',
    tail: 'from-[#8c8c8c]',
    tailFade: 'to-transparent',
    border: 'border-[#8c8c8c]/25',
    bg: 'bg-[#8c8c8c]/8',
  },
  bronze: {
    label: 'Bronze',
    color: 'text-[#cd7f32]',
    glow: 'shadow-[0_0_8px_rgba(205,127,50,0.3)]',
    tail: 'from-[#cd7f32]',
    tailFade: 'to-transparent',
    border: 'border-[#cd7f32]/25',
    bg: 'bg-[#cd7f32]/8',
  },
  silver: {
    label: 'Silver',
    color: 'text-[#c0c0c0]',
    glow: 'shadow-[0_0_8px_rgba(192,192,192,0.3)]',
    tail: 'from-[#c0c0c0]',
    tailFade: 'to-transparent',
    border: 'border-[#c0c0c0]/25',
    bg: 'bg-[#c0c0c0]/8',
  },
  gold: {
    label: 'Gold',
    color: 'text-[#FFD700]',
    glow: 'shadow-[0_0_10px_rgba(255,215,0,0.35)]',
    tail: 'from-[#FFD700]',
    tailFade: 'to-transparent',
    border: 'border-[#FFD700]/30',
    bg: 'bg-[#FFD700]/8',
  },
  platinum: {
    label: 'Platinum',
    color: 'text-[#4dd9c0]',
    glow: 'shadow-[0_0_10px_rgba(77,217,192,0.35)]',
    tail: 'from-[#4dd9c0]',
    tailFade: 'to-transparent',
    border: 'border-[#4dd9c0]/30',
    bg: 'bg-[#4dd9c0]/8',
  },
  diamond: {
    label: 'Diamond',
    color: 'text-[#a5f3fc]',
    glow: 'shadow-[0_0_12px_rgba(165,243,252,0.4)]',
    tail: 'from-[#a5f3fc]',
    tailFade: 'to-transparent',
    border: 'border-[#a5f3fc]/30',
    bg: 'bg-[#a5f3fc]/8',
  },
  master: {
    label: 'Master',
    color: 'text-[#c084fc]',
    glow: 'shadow-[0_0_12px_rgba(192,132,252,0.45)]',
    tail: 'from-[#c084fc]',
    tailFade: 'to-transparent',
    border: 'border-[#c084fc]/35',
    bg: 'bg-[#c084fc]/8',
  },
  grandmaster: {
    label: 'Grandmaster',
    color: 'text-[#f87171]',
    glow: 'shadow-[0_0_14px_rgba(248,113,113,0.5)]',
    tail: 'from-[#f87171]',
    tailFade: 'to-transparent',
    border: 'border-[#f87171]/35',
    bg: 'bg-[#f87171]/10',
  },
}

interface RankBadgeProps {
  tier: RankTier
  size?: 'sm' | 'md' | 'lg'
}

export default function RankBadge({ tier, size = 'md' }: RankBadgeProps) {
  const rank = RANKS[tier]

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3 py-1.5 gap-2.5',
  }

  const meteorSize = {
    sm: { head: 'w-1 h-1', tail: 'w-5' },
    md: { head: 'w-1.5 h-1.5', tail: 'w-6' },
    lg: { head: 'w-2 h-2', tail: 'w-8' },
  }

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-semibold
        ${rank.bg} ${rank.border} ${rank.color} ${rank.glow}
        ${sizeClasses[size]}
        select-none
      `}
    >
      {/* Meteor icon */}
      <span className="inline-flex items-center" aria-hidden>
        {/* Tail */}
        <span
          className={`
            block rounded-full opacity-60
            bg-gradient-to-r ${rank.tail} ${rank.tailFade}
            ${meteorSize[size].tail} h-px
          `}
        />
        {/* Head */}
        <span
          className={`
            block rounded-full -ml-0.5
            ${meteorSize[size].head}
            bg-current opacity-90
          `}
        />
      </span>

      {rank.label}
    </span>
  )
}

export { RANKS }
