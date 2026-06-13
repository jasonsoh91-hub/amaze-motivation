"use client"

import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronDown, XCircle, CheckCircle, Loader2, BookOpen, Award, Sparkles, ArrowRight, Check, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ============================================================================
// IMAGE ASSETS
// ============================================================================
const BOOK_IMAGE = "/book-cover.png"

const PAIN_IMAGES = {
  busy: "/images/pain-busy.png",
  stuck: "/images/pain-stuck.png",
  drained: "/images/pain-drained.png",
  noise: "/images/pain-noise.png",
}

// ============================================================================
// FLOATING WORD PARTICLES
// ============================================================================
const PARTICLE_WORDS = ["CLARITY", "PAUSE", "RESET", "FOCUS", "CALM", "SPACE"]

interface ParticleConfig {
  word: string
  fontSize: number
  opacity: number
  top: number
  left: number
  duration: number
  delay: number
  yRange: number
}

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<ParticleConfig[]>([])

  useEffect(() => {
    setMounted(true)
    const configs = PARTICLE_WORDS.map((word, i) => ({
      word,
      fontSize: 11 + Math.random() * 7,
      opacity: 0.08 + Math.random() * 0.05,
      top: 10 + (i * 13) % 75,
      left: 5 + (i * 15) % 85,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 2,
      yRange: 18 + Math.random() * 18,
    }))
    setParticles(configs)
  }, [])

  if (!mounted) return <div className="fixed inset-0 z-0 pointer-events-none" />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.word}
          className="absolute font-light tracking-widest pointer-events-none"
          style={{
            fontSize: `${particle.fontSize}px`,
            color: `rgba(139, 92, 246, ${particle.opacity})`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -particle.yRange, 0],
                  opacity: [particle.opacity * 0.7, particle.opacity * 1.2, particle.opacity * 0.7],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
          }}
        >
          {particle.word}
        </motion.span>
      ))}
    </div>
  )
}

// ============================================================================
// SCROLL PROGRESS BAR
// ============================================================================
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        background: "linear-gradient(90deg, #8B5CF6, #F59E0B)",
        scaleX,
      }}
    />
  )
}

// ============================================================================
// VIGNETTE OVERLAY
// ============================================================================
function VignetteOverlay() {
  return (
    <div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, transparent 60%, rgba(139, 92, 246, 0.06) 100%)",
      }}
    />
  )
}

// ============================================================================
// SECTION 1: HERO
// ============================================================================
function HeroSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const headlineY = useTransform(scrollY, [0, 200], [0, -25])
  const bookScale = useTransform(scrollY, [0, 300], [1, 0.92])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFFFFF", paddingTop: "80px" }}
    >
      {/* CSS Gradient background fallback */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.25)" }}
        >
          <Sparkles className="w-4 h-4" style={{ color: "#F59E0B" }} />
          <span className="text-sm font-semibold" style={{ color: "#7C3AED" }}>
            FREE 7-DAY GUIDE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div style={{ y: headlineY }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            style={{
              background: "linear-gradient(135deg, #1A1A2E 0%, #7C3AED 50%, #F59E0B 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            You know the feeling.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl md:text-2xl font-light mb-8"
            style={{ color: "#4B5563", lineHeight: "1.6" }}
          >
            You're doing everything right. But somehow,<br />
            you end up in the same place.
          </motion.p>
        </motion.div>

        {/* Opening body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto mb-10"
          style={{ color: "#6B7280", lineHeight: "1.75", fontSize: "1.05rem" }}
        >
          <p>
            You work hard. You deliver. But the promotions never quite arrive. The relationships feel
            stuck in loops. The energy drains away by 3pm. <span style={{ color: "#F59E0B" }}>You're not lazy. You're just running without a map.</span>
          </p>
        </motion.div>

        {/* Book mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{ scale: bookScale }}
          className="relative w-64 h-80 md:w-72 md:h-[28rem] mx-auto mb-10"
        >
          <Image
            src={BOOK_IMAGE}
            alt="7 Days to Clarity Guide"
            fill
            className="object-cover rounded-lg shadow-2xl"
            style={{ filter: "drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))" }}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <button
            onClick={scrollToForm}
            className="px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
              color: "#FFFFFF",
              boxShadow: "0 10px 40px rgba(139, 92, 246, 0.3)",
            }}
          >
            Get My Free Clarity Guide
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Takes 60 seconds • No spam • Instant access
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#9CA3AF" }}
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// GOLD DIVIDER
// ============================================================================
function GoldDivider() {
  return (
    <div
      className="w-full h-px"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.5) 50%, transparent 100%)",
      }}
    />
  )
}

// ============================================================================
// SECTION 2: PROBLEM AWARENESS
// ============================================================================
function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const problems = [
    {
      icon: "⚡",
      title: "Busy But Going Nowhere",
      text: "You're moving constantly—meetings, deadlines, commitments. But at the end of each day, you can't point to what actually changed.",
      image: PAIN_IMAGES.busy,
    },
    {
      icon: "🔁",
      title: "Same Loops, Different Day",
      text: "The same arguments. The same work patterns. The same exhaustion. You know something needs to shift, but what?",
      image: PAIN_IMAGES.stuck,
    },
    {
      icon: "🔋",
      title: "Running On Empty",
      text: "By 2pm, your brain feels like static. You make decisions you regret. You snap at people you care about.",
      image: PAIN_IMAGES.drained,
    },
    {
      icon: "📢",
      title: "Can't Hear Yourself Think",
      text: "Between notifications, expectations and everyone else's urgency, you've lost touch with your own direction.",
      image: PAIN_IMAGES.noise,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#FEF9F3" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#F59E0B" }}>
            WHEN PUSHING HARDER ISN'T WORKING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1A1A2E" }}>
            You don't need more motivation.
            <span style={{ color: "#7C3AED" }}> You need space to think.</span>
          </h2>
        </motion.div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-lg cursor-default"
              style={{ border: "1px solid rgba(139, 92, 246, 0.15)" }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{problem.icon}</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1A1A2E" }}>{problem.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {problem.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-lg" style={{ color: "#4B5563", lineHeight: "1.7" }}>
            <span style={{ color: "#F59E0B", fontWeight: "600" }}>What if 7 days of quiet reflection could help you see the patterns—and choose a different path?</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 3: BENEFITS
// ============================================================================
function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const benefits = [
    {
      number: "01",
      title: "Recognize Your Patterns",
      description: "The situations, reactions and behaviours that keep repeating—and what they're trying to tell you.",
    },
    {
      number: "02",
      title: "Clear the Mental Noise",
      description: "Bring unresolved decisions, emotions and concerns into focus instead of letting them quietly drain you.",
    },
    {
      number: "03",
      title: "Reset with Intention",
      description: "Reconnect with who you're becoming—and choose one grounded step to carry forward.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#F59E0B" }}>
            WHAT BECOMES POSSIBLE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1A1A2E" }}>
            7 Days to Clarity.
            <span style={{ color: "#7C3AED" }}> One simple exercise at a time.</span>
          </h2>
        </motion.div>

        {/* Benefits */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex gap-6 items-start p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-md"
              style={{ border: "1px solid rgba(245, 158, 11, 0.2)" }}
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A78BFA)", color: "#FFFFFF" }}
              >
                {benefit.number}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 4: BEFORE/AFTER
// ============================================================================
function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#FEF9F3" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Before */}
          <div className="bg-white p-8 rounded-2xl border" style={{ border: "1px solid rgba(239, 68, 68, 0.2)" }}>
            <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#EF4444" }}>
              BEFORE
            </p>
            <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "#1A1A2E" }}>
              Reacting to everything.<br />
              Choosing nothing.
            </h3>
            <ul className="space-y-3">
              {[
                "Making decisions based on urgency, not intention",
                "Caught in loops you can't quite explain",
                "Energy drained by 3pm",
                "Uncertain if you're moving in the right direction",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: "#6B7280" }}>
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-white p-8 rounded-2xl border" style={{ border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#10B981" }}>
              AFTER 7 DAYS
            </p>
            <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "#1A1A2E" }}>
              Noticing patterns.<br />
              Choosing intentionally.
            </h3>
            <ul className="space-y-3">
              {[
                "Making decisions based on clarity, not pressure",
                "Recognizing what keeps repeating—and why",
                "Protecting your energy with boundaries",
                "Grounded in a direction you've chosen",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: "#6B7280" }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 5: TESTIMONIALS
// ============================================================================
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Marketing Manager",
      company: "TechCorp",
      image: "https://i.pravatar.cc/150?img=1",
      content: "I was skeptical. Another self-help thing? But Day 2 hit different—I realized I had been reacting to everything instead of choosing intentionally. The questions forced me to think deeply.",
      rating: 5,
    },
    {
      name: "James Kim",
      role: "Startup Founder",
      company: "InnovateLabs",
      image: "https://i.pravatar.cc/150?img=2",
      content: "I've downloaded dozens of guides. Most sit unused. This one I actually completed. It doesn't demand more work—it asks you to pause and notice what you're already doing. Simple but powerful.",
      rating: 5,
    },
    {
      name: "Amanda Liu",
      role: "Teacher",
      company: "CreativeStudio",
      image: "https://i.pravatar.cc/150?img=3",
      content: "Between grading and managing my kids' schedules, my brain is constantly full. This guide gave me permission to pause for 10 minutes each day without guilt. By the end of the week, I could hear my own thoughts again.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "StartupXYZ",
      image: "https://i.pravatar.cc/150?img=4",
      content: "The best investment I made this year. The exercises are practical and the insights are actionable. I finally understand my patterns and can make better decisions.",
      rating: 5,
    },
    {
      name: "Lisa Anderson",
      role: "Marketing Director",
      company: "GrowthCo",
      image: "https://i.pravatar.cc/150?img=5",
      content: "Game-changer for my mental clarity. The daily exercises helped me identify what was draining my energy and what actually matters. Highly recommend.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      image: "https://i.pravatar.cc/150?img=6",
      content: "Exceptional quality and insights. The structured approach to self-reflection is exactly what I needed. Our team productivity has improved significantly.",
      rating: 5,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#F59E0B" }}>
            WHAT PEOPLE ARE SAYING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            Real results from real people.
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Don't just take our word for it. Here's what people have to say about their 7-day clarity journey.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-full transition-all duration-300 hover:shadow-xl bg-white border"
                style={{
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                }}
              >
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p
                    className="mb-6 leading-relaxed"
                    style={{ color: "#4B5563", fontSize: "0.9rem" }}
                  >
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback
                        className="bg-gradient-to-br from-violet-600 to-purple-600 text-white font-semibold"
                      >
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold" style={{ color: "#1A1A2E" }}>{testimonial.name}</h4>
                      <p className="text-sm" style={{ color: "#7C3AED" }}>
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 6: FORM
// ============================================================================
function OptInFormSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      // Store in localStorage as backup
      localStorage.setItem("amaze_v2_lead", JSON.stringify({
        ...formData,
        timestamp: Date.now(),
      }))

      // Redirect to thank you page
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/thank-you")
    } catch (error) {
      console.error("Form submission error:", error)
      // Fallback to localStorage
      localStorage.setItem("amaze_v2_lead", JSON.stringify({
        ...formData,
        timestamp: Date.now(),
      }))
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/thank-you")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={forwardedRef}
      className="py-16 relative overflow-hidden"
      style={{ background: "#FEF9F3" }}
    >
      <div className="max-w-xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: "#F59E0B" }}>
            YOUR 7-DAY CLARITY JOURNEY STARTS HERE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1A1A2E" }}>
            Where should we send your free guide?
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl bg-white border shadow-lg"
          style={{ border: "1px solid rgba(139, 92, 246, 0.15)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your name"
                className={`w-full px-5 py-4 rounded-xl bg-gray-50 border transition-all outline-none ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-200 focus:border-violet-500"
                } placeholder-gray-400`}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
            </div>

            {/* Email field */}
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Your email"
                className={`w-full px-5 py-4 rounded-xl bg-gray-50 border transition-all outline-none ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-200 focus:border-violet-500"
                } placeholder-gray-400`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email}
              className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
              style={{
                background: !formData.name || !formData.email
                  ? "linear-gradient(135deg, #92400E, #B45309)"
                  : "linear-gradient(135deg, #10B981, #059669)",
                color: "#FFFFFF",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Send Me the Free Guide
                </>
              )}
            </button>

            {/* Trust copy */}
            <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span>🔒 Free</span>
              <span>•</span>
              <span>No spam</span>
              <span>•</span>
              <span>Instant access</span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 7: FINAL CTA
// ============================================================================
function FinalCTASection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Book mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative w-56 h-72 mx-auto mb-10"
        >
          <img
            src={BOOK_IMAGE}
            alt="7 Days to Clarity Guide"
            className="object-cover rounded-lg shadow-2xl w-full h-full"
            style={{ filter: "drop-shadow(0 20px 40px rgba(139, 92, 246, 0.25))" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #7C3AED 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          You don't need to figure everything out right now.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "#6B7280", lineHeight: "1.7" }}
        >
          Start with ten quiet minutes. Pause the noise, understand what has been repeating,
          and take one more intentional step toward the person you're becoming.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={scrollToForm}
            className="px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              color: "#FFFFFF",
              boxShadow: "0 10px 40px rgba(245, 158, 11, 0.25)",
            }}
          >
            Start My Free 7-Day Clarity Reset
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm mt-4" style={{ color: "#9CA3AF" }}>
            Free • Takes 60 seconds • No email spam
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: "rgba(139, 92, 246, 0.1)", background: "#FEF9F3" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Amaze Motivation</h3>
            <p className="text-sm" style={{ color: "#6B7280" }}>Reflect. Understand. Grow.</p>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            © 2026 Amaze Motivation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function V2Page() {
  const formRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10" style={{ background: "#FEF9F3" }} />

      {/* Effects */}
      <ScrollProgressBar />
      <FloatingParticles />
      <VignetteOverlay />

      {/* Sections */}
      <HeroSection formRef={formRef} />

      <GoldDivider />

      <ProblemSection />

      <BenefitsSection />

      <BeforeAfterSection />

      <TestimonialsSection />

      <OptInFormSection forwardedRef={formRef} />

      <FinalCTASection formRef={formRef} />

      <Footer />
    </div>
  )
}
