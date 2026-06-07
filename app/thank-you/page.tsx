import Link from 'next/link'
import { Check, ArrowRight, Mail } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Check className="w-12 h-12 text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-violet-900 mb-4 font-['Playfair_Display']">
          You&apos;re In!
        </h1>

        {/* Subheading */}
        <p className="text-xl text-violet-800 mb-8 leading-relaxed">
          Your free 7 Days to Clarity guide is on its way to your inbox.
        </p>

        {/* What's Next Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-violet-100 shadow-lg mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-violet-600" />
            <h2 className="text-xl font-bold text-violet-900">What&apos;s Next?</h2>
          </div>
          <ul className="text-left space-y-3 text-violet-700">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Check your email for the guide (may take a few minutes)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Save the guide somewhere accessible</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Start Day 1 whenever you&apos;re ready—no pressure</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-violet-700/80">
            While you wait, follow us for more clarity content:
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@AmazeMotivation4u"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              YouTube
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/amaze_motivation/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              Instagram
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-violet-700 hover:text-violet-900 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
