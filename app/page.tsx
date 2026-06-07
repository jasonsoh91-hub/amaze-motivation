'use client'

import { useState } from 'react'
import { Check, ArrowRight, Sparkles, BookOpen, Award, Menu, X, Brain, Wind, RefreshCw } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation, CarouselIndicator } from '@/components/ui/carousel'
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

// 3D Book Mockup Component
const BookMockup = () => (
  <div className="relative w-56 h-80 md:w-72 md:h-[28rem] mx-auto perspective-1000">
    <div className="relative w-full h-full transform-style-3d animate-float">
      {/* Book shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/40 blur-xl rounded-full"></div>

      {/* Main book container with 3D effect */}
      <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Submission error:', data)
        // Fall back to localStorage on error
        const leads = JSON.parse(localStorage.getItem('amaze_leads') || '[]')
        leads.push({ name, email, date: new Date().toISOString() })
        localStorage.setItem('amaze_leads', JSON.stringify(leads))
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      // Fall back to localStorage on error
      const leads = JSON.parse(localStorage.getItem('amaze_leads') || '[]')
      leads.push({ name, email, date: new Date().toISOString() })
      localStorage.setItem('amaze_leads', JSON.stringify(leads))
      setIsSubmitted(true)
    }

    setIsSubmitting(false)
  }

  const scrollToForm = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWhatsInside = () => {
    document.getElementById('whats-inside')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-violet-900 tracking-tight">Amaze Motivation</h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={scrollToWhatsInside}
                className="text-violet-700 hover:text-violet-900 font-medium transition-colors duration-200"
              >
                What&apos;s Inside
              </button>
              <button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md min-h-[44px]"
              >
                Get the Free Guide
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-violet-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <button
                onClick={() => { scrollToWhatsInside(); setMobileMenuOpen(false); }}
                className="block w-full text-left text-violet-700 hover:text-violet-900 font-medium py-2"
              >
                What&apos;s Inside
              </button>
              <button
                onClick={() => { scrollToForm(); setMobileMenuOpen(false); }}
                className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-full text-center min-h-[44px]"
              >
                Get the Free Guide
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-violet-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-violet-100/50 px-4 py-2 rounded-full mb-6 border border-violet-200/50">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-violet-700 text-sm font-medium">FREE 7-DAY SELF-REFLECTION GUIDE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-violet-900 mb-4 leading-tight tracking-tight font-['Playfair_Display']">
                7 Days to
                <span className="block bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  Clarity
                </span>
              </h1>

              {/* Supporting Headline */}
              <p className="text-xl md:text-2xl text-violet-900 max-w-xl mb-5 font-bold leading-tight">
                Pause the noise. Understand your patterns. Reset your direction.
              </p>

              {/* Body Copy */}
              <p className="text-lg text-violet-800/80 max-w-md mb-8 leading-relaxed">
                A guided self-reflection journey designed to help you slow down, recognize what keeps repeating, process what you are feeling and move forward with greater clarity—one simple exercise at a time.
              </p>

              {/* Form */}
              <div className="max-w-md mx-auto lg:mx-0 mb-8">
                <div className="bg-gradient-to-br from-violet-100/50 to-purple-100/50 backdrop-blur-sm p-6 rounded-2xl border border-violet-200/50 shadow-xl">
                  <p className="text-violet-900 text-sm font-semibold mb-4">Where should we send your free guide?</p>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="w-full">
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="name-hero" className="sr-only">Your name</label>
                          <input
                            id="name-hero"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/50 border-b-2 border-violet-200 focus:border-violet-500 focus:bg-white/70 transition-all outline-none text-violet-900 placeholder-violet-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="email-hero" className="sr-only">Email address</label>
                          <input
                            id="email-hero"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/50 border-b-2 border-violet-200 focus:border-violet-500 focus:bg-white/70 transition-all outline-none text-violet-900 placeholder-violet-400"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || !name || !email}
                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-violet-300 disabled:to-purple-300 text-white disabled:text-violet-500 font-bold px-6 py-4 rounded-full text-base transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg min-h-[44px] mt-2"
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
                              Send Me the Free Guide
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <p className="text-violet-600/60 text-xs text-center">
                          Instant access. No spam. Unsubscribe anytime.
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Check className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-violet-900 mb-1">You&apos;re In!</h3>
                      <p className="text-violet-700 text-sm">
                        Check your inbox for your free guide.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <button
                  onClick={scrollToWhatsInside}
                  className="text-violet-700 hover:text-violet-900 font-semibold flex items-center gap-2 transition-colors duration-200 cursor-pointer"
                >
                  See What&apos;s Inside
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Value Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 text-violet-700/80 text-sm">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  7 guided exercises
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Printable worksheets
                </span>
                <span className="flex items-center gap-2">
                  <span>10 minutes a day</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>Instant access</span>
                </span>
              </div>
            </div>

            {/* Right - Book Mockup */}
            <div className="flex justify-center order-1 lg:order-2">
              <BookMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Awareness Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full mb-6">
            <span className="text-violet-700 text-sm font-semibold tracking-wide">WHEN PUSHING HARDER ISN&apos;T WORKING</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-violet-900 mb-6 leading-tight font-['Playfair_Display']">
            You may not need more motivation. You may need space to hear yourself.
          </h2>

          {/* Body Copy */}
          <div className="space-y-4 text-lg text-violet-800/80 leading-relaxed mb-8">
            <p>
              You are ambitious. You care about growing, improving and making meaningful progress.
            </p>
            <p>
              But when your mind is carrying too many decisions, emotions, expectations and unfinished thoughts, even simple choices can begin to feel heavy.
            </p>
            <p className="font-medium text-violet-900">
              You stay busy, but you do not feel clear.
            </p>
            <p>
              The answer is not always another productivity system or a longer to-do list. Sometimes, clarity begins by slowing down long enough to notice what is really happening beneath the noise.
            </p>
          </div>

          {/* Closing Statement */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 px-6 py-4 rounded-2xl border border-violet-200/50">
            <Brain className="w-6 h-6 text-violet-600" />
            <p className="text-violet-900 font-semibold">
              7 Days to Clarity gives you a simple structure for doing exactly that.
            </p>
          </div>
        </div>
      </section>

      {/* Three Key Outcomes Section */}
      <section className="py-24 bg-[#FEF9F3]">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 leading-tight font-['Playfair_Display']">
              What becomes possible when you create space for clarity?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Outcome 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 leading-tight">Understand Your Patterns</h3>
              <p className="text-[#4A4A68] leading-relaxed">
                Recognize the situations, reactions and behaviours that keep repeating—so you can stop operating on autopilot.
              </p>
            </div>

            {/* Outcome 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 leading-tight">Clear the Mental Noise</h3>
              <p className="text-[#4A4A68] leading-relaxed">
                Bring unresolved decisions, emotions and concerns into focus instead of allowing them to quietly consume your energy.
              </p>
            </div>

            {/* Outcome 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center mb-6">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 leading-tight">Reset with Intention</h3>
              <p className="text-[#4A4A68] leading-relaxed">
                Reconnect with the person you are becoming and choose one grounded step to carry forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Eyebrow */}
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full text-violet-700 text-sm font-semibold tracking-wide">
              SIMPLE, GUIDED AND PRACTICAL
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4 font-['Playfair_Display']">
              Everything you need to begin—without overwhelming yourself
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: BookOpen,
                title: "Guided Reflection Questions",
                description: "Thoughtful prompts that help you look beneath surface-level answers."
              },
              {
                icon: Award,
                title: "One Daily Action",
                description: "A manageable exercise that turns reflection into a practical next step."
              },
              {
                icon: Sparkles,
                title: "Printable Worksheets",
                description: "A structured place to capture your thoughts, observations and decisions."
              },
              {
                icon: Wind,
                title: "Just 10 Minutes a Day",
                description: "Designed to fit into a busy schedule without becoming another demanding commitment."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-violet-900 mb-2">{item.title}</h3>
                  <p className="text-violet-700/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting Statement */}
          <div className="text-center">
            <p className="text-violet-800/90 text-lg max-w-2xl mx-auto leading-relaxed">
              You do not need to have everything figured out before you begin. The guide will help you work through it one day at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4 font-['Playfair_Display']">
              What people are saying
            </h2>
            <p className="text-lg text-violet-700/80 max-w-2xl mx-auto">
              Real experiences from people who took 7 days to pause, reflect and reset.
            </p>
          </div>

          {/* Circular Testimonials */}
          <CircularTestimonials
            testimonials={[
              {
                name: "Sarah M.",
                designation: "Marketing Professional",
                quote: "I didn&apos;t realize how much mental noise I was carrying until Day 3. The exercise helped me name exactly what was draining my energy—and that simple awareness changed everything.",
                src: "https://ui-avatars.com/api/?name=Sarah+M&background=8B5CF6&color=fff&size=400"
              },
              {
                name: "James K.",
                designation: "Entrepreneur",
                quote: "I&apos;ve tried countless productivity systems, but this was different. Instead of adding more to my plate, it helped me see what I needed to put down. Finally feel like I&apos;m moving with intention.",
                src: "https://ui-avatars.com/api/?name=James+K&background=F59E0B&color=fff&size=400"
              },
              {
                name: "Amanda L.",
                designation: "Teacher & Mother",
                quote: "10 minutes a day felt manageable even on my busiest days. By Day 7, I had clarity on what actually matters to me right now—not what I thought should matter. Highly recommend.",
                src: "https://ui-avatars.com/api/?name=Amanda+L&background=8B5CF6&color=fff&size=400"
              }
            ]}
            colors={{
              name: "#4C1D95",
              designation: "#7C3AED",
              testimony: "#5B21B6",
              arrowBackground: "#7C3AED",
              arrowForeground: "#FFFFFF",
              arrowHoverBackground: "#8B5CF6"
            }}
            fontSizes={{
              name: "1.5rem",
              designation: "0.95rem",
              quote: "1.1rem"
            }}
            autoplay={true}
          />

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-violet-100 px-6 py-3 rounded-full">
              <Sparkles className="w-5 h-5 text-violet-600" />
              <span className="text-violet-700 font-medium">Join thousands who have started their clarity journey</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Day Guide Preview Section */}
      <section id="whats-inside" className="py-24 bg-gradient-to-br from-violet-600 via-purple-700 to-amber-600 relative overflow-hidden">
        {/* Subtle decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full opacity-5 border-[1px] border-white rounded-full [clip-path:ellipse(50%_100%_at_50%_100%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Eyebrow */}
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-semibold tracking-wide border border-white/20">
              INSIDE THE GUIDE
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Playfair_Display']">
              Your 7-Day Clarity Journey
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              7 days. 7 guided exercises. One clearer direction forward.
            </p>
          </div>

          {/* Carousel */}
          <Carousel className="relative mb-16">
            <CarouselContent className="gap-6">
              {[
                {
                  day: "Day 1",
                  name: "Pause",
                  title: "Create space before taking another step.",
                  desc: "Slow down long enough to notice whether you are consciously choosing your next move—or simply reacting to everything around you.",
                  quote: "You don't need more motivation. You need space to pause."
                },
                {
                  day: "Day 2",
                  name: "Patterns",
                  title: "Notice what keeps repeating.",
                  desc: "Identify the situations, roles and behaviours that continue appearing in your life, and begin understanding the lesson beneath them.",
                  quote: "Your life doesn't repeat by accident—your patterns do."
                },
                {
                  day: "Day 3",
                  name: "Clarity",
                  title: "Name what is draining your attention.",
                  desc: "Choose one unresolved question, delayed decision or source of confusion and bring it clearly into focus.",
                  quote: "Confusion drains more energy than hard work."
                },
                {
                  day: "Day 4",
                  name: "Emotions",
                  title: "Acknowledge what you have been avoiding.",
                  desc: "Recognize the emotions you may have been suppressing and create space to process them without judgment.",
                  quote: "What you don't process can quietly control you."
                },
                {
                  day: "Day 5",
                  name: "Control",
                  title: "Release what was never yours to carry.",
                  desc: "Separate what you can influence from what you cannot, and redirect your energy toward what is genuinely within your control.",
                  quote: "Clarity comes when we separate what we can control from what we cannot."
                },
                {
                  day: "Day 6",
                  name: "Identity",
                  title: "Recognize who you are becoming.",
                  desc: "Explore the version of yourself you may be outgrowing and the new identity that is beginning to emerge.",
                  quote: "You're not stuck—you're evolving."
                },
                {
                  day: "Day 7",
                  name: "Reset",
                  title: "Choose what you want to carry forward.",
                  desc: "Reflect on what you have learned, decide what needs to change and choose one simple habit to continue beyond the seven days.",
                  quote: "You don't need a new life—just a reset."
                }
              ].map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex flex-col h-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center font-bold text-white text-lg shadow-lg mb-4">
                      {i + 1}
                    </div>
                    <div className="text-amber-300 font-semibold text-sm mb-1">{item.day}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">{item.title}</p>
                    <p className="text-white/70 leading-relaxed text-sm flex-grow">{item.desc}</p>
                    {item.quote && (
                      <p className="text-white/60 italic text-xs mt-4 pt-4 border-t border-white/10">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNavigation className="hidden md:flex" alwaysShow />
            <CarouselIndicator className="md:hidden mt-8" />
          </Carousel>

          {/* Inclusion Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-amber-400/20 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-400/30">
              <Award className="w-5 h-5 text-amber-300" />
              <span className="text-white font-medium">Includes printable worksheets, reflection questions and one practical action for every day</span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-300 text-violet-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
            >
              Start My 7-Day Clarity Reset
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recognition / This Is For You Section */}
      <section className="py-24 bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50">
        <div className="max-w-3xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4 font-['Playfair_Display']">
              This guide is for you if…
            </h2>
          </div>

          {/* Checklist */}
          <div className="space-y-4 mb-12">
            {[
              "You are ambitious but mentally scattered.",
              "You spend too much time overthinking decisions.",
              "You keep noticing the same situations or emotional patterns repeating.",
              "You are busy, but unsure whether you are moving in the right direction.",
              "You feel responsible for too many things at once.",
              "You sense that you are changing, but cannot yet explain what is changing.",
              "You want meaningful self-reflection without complicated theory or empty motivational advice."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white hover:bg-violet-50 transition-colors border border-violet-100">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-violet-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200/50">
            <p className="text-violet-900 text-lg leading-relaxed">
              You do not need to solve your entire life in seven days. You only need enough space to see your next step more clearly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4 font-['Playfair_Display']">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How much time does each exercise take?",
                a: "Each day is designed to take approximately 10 minutes. You can spend longer if you want to explore your responses more deeply."
              },
              {
                q: "Is this a productivity planner?",
                a: "No. This is a guided self-reflection workbook. It is designed to help you understand your patterns, emotions and current direction before deciding what to do next."
              },
              {
                q: "Do I need to know what I want before starting?",
                a: "No. The exercises are designed to help you clarify what is happening internally, even if you currently feel uncertain or stuck."
              },
              {
                q: "What is included?",
                a: "You will receive seven guided exercises, daily reflection questions, practical actions and printable worksheets."
              },
              {
                q: "How will I receive the guide?",
                a: "Enter your email address and the guide will be delivered directly to your inbox."
              },
              {
                q: "Is the guide really free?",
                a: "Yes. The guide is free. There are no hidden charges."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-100">
                <h3 className="font-bold text-violet-900 mb-2">{faq.q}</h3>
                <p className="text-violet-700/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="py-24 bg-gradient-to-br from-violet-700 via-purple-800 to-amber-900 relative overflow-hidden">
        {/* Subtle decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full opacity-5 border-[1px] border-white rounded-full [clip-path:ellipse(50%_100%_at_50%_100%)]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-white/90 text-sm font-semibold">YOUR RESET CAN BEGIN TODAY</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-['Playfair_Display']">
            You do not need to figure everything out right now.
          </h2>

          {/* Supporting Copy */}
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Start with ten quiet minutes.<br />
            Pause the noise, understand what has been repeating and take one more intentional step toward the person you are becoming.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl">
              <p className="text-white/90 text-sm font-semibold mb-4">Where should we send your free guide?</p>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name-final" className="sr-only">Your name</label>
                      <input
                        id="name-final"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-final" className="sr-only">Email address</label>
                      <input
                        id="email-final"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !email}
                      className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-300 disabled:from-white/30 disabled:via-white/30 disabled:to-white/30 text-violet-900 disabled:text-white/70 font-bold px-6 py-4 rounded-full text-base transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl min-h-[44px] mt-2"
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
                          Start My 7-Day Clarity Reset
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-white/60 text-xs text-center">
                      Instant access. No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">You&apos;re In!</h3>
                  <p className="text-white/90 text-sm">
                    Check your inbox for your free guide.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-violet-900 via-purple-900 to-amber-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-2 leading-tight tracking-wide">Amaze Motivation</h3>
              <p className="text-purple-200/80 font-medium">Reflect. Understand. Grow.</p>
            </div>

            {/* Social Links */}
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

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <a href="#" className="text-purple-200/80 hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-purple-200/40">|</span>
            <a href="#" className="text-purple-200/80 hover:text-white transition-colors">Terms of Use</a>
            <span className="text-purple-200/40">|</span>
            <a href="#" className="text-purple-200/80 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-center text-purple-200/60 text-sm">
            <p>© 2026 Amaze Motivation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
