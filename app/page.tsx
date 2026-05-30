'use client'

import { useState } from 'react'
import { Check, ArrowRight, Sparkles, Target, Zap, Heart, BookOpen, Award, Users } from 'lucide-react'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'

// Custom social media icons
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

// 3D Book Mockup Component with actual image
const BookMockup = () => (
  <div className="relative w-56 h-80 md:w-72 md:h-[28rem] mx-auto perspective-1000">
    <div className="relative w-full h-full transform-style-3d animate-float">
      {/* Book shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/40 blur-xl rounded-full"></div>

      {/* Main book container with 3D effect */}
      <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
        {/* Your actual book cover image */}
        <img
          src="/book-cover.png"
          alt="7 Days to Clarity - Free Guide by Amaze Motivation"
          className="w-full h-full object-cover"
        />

        {/* Shine/gloss effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  </div>
)

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setIsSubmitting(true)

    // Simulate API call - replace with your actual endpoint
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Store in localStorage for demo (replace with your backend/database)
    const leads = JSON.parse(localStorage.getItem('amaze_leads') || '[]')
    leads.push({ name, email, date: new Date().toISOString() })
    localStorage.setItem('amaze_leads', JSON.stringify(leads))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-700 to-orange-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Pre-headline */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/25">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span className="text-white/95 text-sm font-medium">For the high-achiever who is tired of running in circles...</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
                7 DAYS TO
                <span className="block bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  CLARITY
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/95 max-w-xl mb-6 font-bold leading-tight">
                Stop Spinning Your Wheels. Kill the Overwhelm. Map Your Next Move.
              </p>

              <p className="text-lg text-white/80 max-w-md mb-10 leading-relaxed">
                A ruthless, step-by-step system to reclaim your mental bandwidth, zero in on your true purpose, and build an actionable roadmap for your life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
                <a
                  href="#get-your-guide"
                  className="group bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 hover:from-yellow-100 hover:via-yellow-200 hover:to-yellow-100 text-violet-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer shadow-2xl shadow-yellow-300/40 hover:shadow-yellow-200/60"
                >
                  Get Your Free Guide
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#whats-inside"
                  className="text-white/80 hover:text-white font-semibold flex items-center gap-2 transition-colors duration-200 cursor-pointer"
                >
                  See What's Inside
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Join 10,000+ action-takers who stopped guessing and started executing.</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>100% Free Guide by Amaze Motivation.</span>
                </div>
              </div>
            </div>

            {/* Right - Book Mockup */}
            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <BookMockup />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#benefits" className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-br from-purple-50 via-violet-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-6">
          {/* Agitation Copy */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-violet-900 mb-6">
              You don't lack ambition. You lack clarity.
            </h2>
            <p className="text-xl text-violet-700/90 max-w-2xl mx-auto leading-relaxed mb-4">
              If you're feeling stuck, overwhelmed, or exhausted by the constant noise, it's not because you aren't working hard enough.
            </p>
            <p className="text-xl text-violet-700/90 max-w-2xl mx-auto leading-relaxed font-semibold">
              It's because your energy is scattered across too many decisions, obligations, and dead-end ideas.
            </p>
            <p className="text-2xl text-orange-600 max-w-2xl mx-auto leading-relaxed font-bold mt-6">
              7 Days to Clarity is your reset button.
            </p>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-violet-800 font-semibold mb-8">Here is what happens when you cut the noise:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Reclaim Your Mental Bandwidth",
                description: "Stop wasting hours on decisions that don't move the needle. Wake up knowing exactly what matters today.",
                gradient: "from-orange-500 to-amber-500",
                bgGradient: "from-orange-50 to-amber-50",
                borderColor: "border-orange-200",
                ringColor: "ring-orange-400/30"
              },
              {
                icon: Heart,
                title: "The \"Hell Yes\" Filter",
                description: "Discover your true non-negotiables. Learn how to say no to the things draining your energy so you can say yes to what fuels you.",
                gradient: "from-violet-500 to-purple-500",
                bgGradient: "from-violet-50 to-purple-50",
                borderColor: "border-violet-200",
                ringColor: "ring-violet-400/30"
              },
              {
                icon: Zap,
                title: "Execute with Deadly Precision",
                description: "Swap vague goals for a concrete, step-by-step roadmap that actually makes you excited to get to work.",
                gradient: "from-amber-500 to-yellow-500",
                bgGradient: "from-amber-50 to-yellow-50",
                borderColor: "border-amber-200",
                ringColor: "ring-amber-400/30"
              }
            ].map((benefit, i) => (
              <div
                key={i}
                className={`group bg-gradient-to-br ${benefit.bgGradient} backdrop-blur-sm p-8 rounded-3xl border ${benefit.borderColor} shadow-lg hover:shadow-2xl hover:ring-4 ${benefit.ringColor} transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-violet-900 mb-3 leading-tight">{benefit.title}</h3>
                <p className="text-violet-700/80 leading-relaxed text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section id="whats-inside" className="py-24 bg-gradient-to-br from-violet-600 via-purple-700 to-orange-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What's Inside The Guide
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              7 powerful days. 7 transformative exercises. One new you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { day: "Day 1", title: "The Reality Check", desc: "Assess where you truly are - no more lying to yourself" },
              { day: "Day 2", title: "Define Your Non-Negotiables", desc: "Discover what actually matters to YOU" },
              { day: "Day 3", title: "The Energy Audit", desc: "Identify what drains you vs. what fuels you" },
              { day: "Day 4", title: "Clear The Noise", desc: "Let go of obligations that don't serve you" },
              { day: "Day 5", title: "Your Vision Statement", desc: "Create a compelling future that pulls you forward" },
              { day: "Day 6", title: "Your 90-Day Roadmap", desc: "Turn vision into actionable steps" },
              { day: "Day 7", title: "Your Daily Clarity Practice", desc: "Build habits that keep you focused for life" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {i + 1}
                </div>
                <div>
                  <div className="text-orange-300 font-semibold text-sm mb-1">{item.day}</div>
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-400/30">
              <Award className="w-5 h-5 text-amber-300" />
              <span className="text-white font-semibold">Includes worksheets + daily reflection prompts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Circular Testimonials */}
      <section className="py-24 bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-violet-900 mb-4">
              What People Are Saying
            </h2>
            <p className="text-xl text-violet-700/80 font-medium">
              Real results from real people
            </p>
          </div>

          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={[
                {
                  quote: "Finally, a guide that actually helped me figure out WHAT I truly want. The non-negotiables exercise was a complete game-changer for my decision-making.",
                  name: "Sarah Mitchell",
                  designation: "Marketing Professional",
                  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
                },
                {
                  quote: "I've read dozens of self-help books. This 7-day guide gave me more clarity than all of them combined. The daily exercises are practical and immediately actionable.",
                  name: "James Kingston",
                  designation: "Entrepreneur & Founder",
                  src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                },
                {
                  quote: "Simple, practical, and actually works. I completed it in one week and my focus has never been sharper. Highly recommend for anyone feeling stuck.",
                  name: "Priya Patel",
                  designation: "Software Engineer",
                  src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
                },
                {
                  quote: "This guide helped me identify exactly what was draining my energy and what truly matters to me. I've reclaimed hours in my day and feel more energized.",
                  name: "Michael Chen",
                  designation: "Product Manager",
                  src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                },
                {
                  quote: "The vision roadmap exercise alone was worth it. I finally have a clear path forward and the daily motivation to actually follow through on my goals.",
                  name: "Emma Rodriguez",
                  designation: "Creative Director",
                  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
                }
              ]}
              autoplay={true}
              colors={{
                name: "#4C1D95",
                designation: "#7C3AED",
                testimony: "#374151",
                arrowBackground: "#7C3AED",
                arrowForeground: "#ffffff",
                arrowHoverBackground: "#F97316"
              }}
              fontSizes={{
                name: "1.75rem",
                designation: "1rem",
                quote: "1.125rem"
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-your-guide" className="py-24 bg-gradient-to-br from-violet-700 via-purple-800 to-orange-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-300 rounded-full mix-blend-overlay filter blur-3xl opacity-15"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span className="text-white/95 text-sm font-semibold">Limited Time Free Access</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to Find Your Clarity?
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Get the complete 7 Days to Clarity guide delivered to your inbox. Start your transformation today.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="bg-violet-800/50 p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="space-y-4 mb-6">
                  <label className="block text-left">
                    <span className="text-white/90 text-sm font-semibold mb-2 block">Your Name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    />
                  </label>

                  <label className="block text-left">
                    <span className="text-white/90 text-sm font-semibold mb-2 block">Your Email Address</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email}
                  className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-400 hover:from-green-300 hover:via-green-400 hover:to-green-300 disabled:from-yellow-200 disabled:via-yellow-300 disabled:to-yellow-200 disabled:hover:from-yellow-100 disabled:hover:via-yellow-200 disabled:hover:to-yellow-100 text-white disabled:text-violet-900 font-bold px-6 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-100 disabled:hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-2xl disabled:shadow-yellow-300/40 disabled:hover:shadow-yellow-200/60 shadow-green-400/40 hover:shadow-green-400/60"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get My Free Guide
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-white/60 text-xs mt-4">
                  No spam. Unsubscribe anytime. Your email is safe with us.
                </p>
              </div>
            </form>
          ) : (
            <div className="bg-violet-800/50 p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
              <p className="text-white/90 mb-4">
                Check your inbox for a confirmation email. Your 7 Days to Clarity guide is on its way!
              </p>
              <p className="text-white/60 text-sm">
                (For demo purposes: your email was saved to browser localStorage)
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-br from-violet-900 via-purple-900 to-orange-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-2 leading-tight tracking-wide">Amaze Motivation</h3>
              <p className="text-purple-200/80 font-medium">Igniting greatness, one day at a time.</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.youtube.com/@AmazeMotivation4u"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61554270534544"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/amaze_motivation/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 text-center text-purple-200/60 text-sm">
            <p>© 2024 Amaze Motivation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
