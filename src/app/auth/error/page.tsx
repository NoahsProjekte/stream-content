import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Authentication Failed
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-2 leading-relaxed">
          Something went wrong during the sign-in process. This can happen if
          the authorization code expired or was already used.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Please try signing in again. If the problem persists, make sure your
          Discord account permissions are configured correctly in Supabase.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-gray-600">
          Error code: AUTH_CALLBACK_FAILED
        </p>
      </div>
    </div>
  )
}
