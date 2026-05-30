# Amaze Motivation - Project Summary

**Last Updated:** 2026-05-30

---

## Project Overview

Lead magnet landing page for "Amaze Motivation" brand promoting a free "7 Days to Clarity" eBook/guide.

---

## Live Links

| Description | URL |
|-------------|-----|
| Live Site | https://amaze-motivation-landing.vercel.app |
| GitHub Repo | https://github.com/jasonsoh91-hub/amaze-motivation |
| Vercel Dashboard | https://vercel.com/jasonsoh91-4934s-projects/amaze-motivation-landing |

---

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animation:** Framer Motion (for circular testimonials)
- **Icons:** Lucide React + Custom SVG (Facebook, Instagram, YouTube)

---

## Landing Page Sections

1. **Hero Section**
   - Pre-headline badge
   - Headline: "7 DAYS TO CLARITY"
   - Sub-headline with value prop
   - CTA button (yellow) + secondary link
   - Social proof (10,000+ signups)
   - 3D floating book mockup (book-cover.png)

2. **Benefits Section**
   - Agitation copy: "You don't lack ambition. You lack clarity."
   - 3 benefit cards with icons:
     - Reclaim Your Mental Bandwidth
     - The "Hell Yes" Filter
     - Execute with Deadly Precision

3. **What's Inside Section**
   - 7-day breakdown (Day 1-7)
   - Each day has title + description
   - Badge: "Includes worksheets + daily reflection prompts"

4. **Social Proof - Circular Testimonials**
   - 3D rotating carousel with 5 testimonials
   - Custom colors: purple/amber theme
   - Keyboard navigation (arrow keys)
   - Autoplay (5s intervals)

5. **CTA Form Section**
   - Name + Email inputs
   - **Button behavior:**
     - YELLOW when form incomplete (disabled)
     - GREEN when form complete (enabled)
   - Glassmorphism card (bg-violet-800/50)
   - LocalStorage lead capture (demo)

6. **Footer**
   - Amaze Motivation branding
   - Social media links:
     - YouTube: @AmazeMotivation4u
     - Facebook: profile.php?id=61554270534544
     - Instagram: @amaze_motivation/reels/

---

## Color System

**Brand Flow:** Purple → Orange → Yellow

```css
/* Gradients used throughout */
Hero:           violet-600 → purple-700 → orange-500
Benefits:        purple-50 → violet-50 → amber-50
What's Inside:   violet-600 → purple-700 → orange-600
Testimonials:    violet-50 → purple-50 → amber-50
CTA Section:     violet-700 → purple-800 → orange-900
Footer:          violet-900 → purple-900 → orange-950
```

**CTA Buttons:**
- Disabled (empty): `yellow-200 → yellow-300 → yellow-200`
- Enabled (filled): `green-400 → green-500 → green-400`

---

## Email Sequence Created

**Location:** `/emails/` folder

| File | Timing | Topic |
|------|--------|-------|
| `00-welcome-immediate.md` | Immediate | Welcome + what to expect |
| `day-1-reality-check.md` | Day 1 | Radical honesty exercise |
| `day-2-non-negotiables.md` | Day 2 | "Hell Yes" filter + boundaries |
| `day-3-energy-audit.md` | Day 3 | What fuels/drains you |
| `day-4-clear-the-noise.md` | Day 4 | Permission to say no |
| `day-5-vision-statement.md` | Day 5 | Who you're becoming |
| `day-6-90-day-roadmap.md` | Day 6 | Vision → action plan |
| `day-7-daily-clarity-practice.md` | Day 7 | 5-minute daily habit |
| `day-8-bonus-checkin.md` | Day 10-11 | Re-engagement + CTA |

**Email Style:**
- Mentor tone (conversational, warm)
- Each ends with "Hit reply and share..." (engagement)
- 10-15 min exercises per email
- Human touches: "I read every reply"

---

## Assets

| Asset | Location | Notes |
|-------|----------|-------|
| Book Cover | `/public/book-cover.png` | User-provided actual cover |

---

## Key Customizations Made

1. **Book Mockup Dimensions** (fixed cropping issue)
   - Mobile: `w-56 h-80`
   - Desktop: `w-72 h-[28rem]`
   - Uses `object-cover` to fill container

2. **Form Button Logic**
   ```tsx
   disabled={isSubmitting || !name || !email}
   // Color changes based on disabled state
   ```

3. **Circular Testimonials Colors**
   ```tsx
   colors={{
     name: "#4C1D95",           // Deep purple
     designation: "#7C3AED",    // Violet
     testimony: "#374151",      // Gray
     arrowBackground: "#7C3AED",
     arrowForeground: "#ffffff",
     arrowHoverBackground: "#F97316"  // Orange
   }}
   ```

---

## Pending / Next Steps

### Could Still Add:
- [ ] Actual email backend integration (Replace LocalStorage)
- [ ] Vercel Postgres or Supabase for lead storage
- [ ] Resend.com or SendGrid for email delivery
- [ ] Analytics (Vercel Analytics, Google Analytics)
- [ ] A/B testing for headlines/CTAs
- [ ] Dark mode toggle (currently light/dark via Tailwind)

### Email Integration:
The email templates are ready but need:
- [ ] ESP integration (Resend, SendGrid, ConvertKit, etc.)
- [ ] Automated sequence setup
- [ ] Personalization tokens ([First Name], etc.)
- [ ] Reply tracking setup

---

## Local Development

```bash
cd /Users/jason.soh/Desktop/amaze-motivation-landing
npm run dev
# Runs on http://localhost:3001
```

---

## Deployment Commands

```bash
# Deploy to Vercel
vercel --prod --yes --scope jasonsoh91-4934s-projects

# Push to GitHub
git add -A
git commit -m "message"
git push origin main
```

---

## Files Structure

```
amaze-motivation-landing/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles + theme
├── components/
│   └── ui/
│       ├── button.tsx
│       └── circular-testimonials.tsx
├── emails/                # 9 email templates
│   ├── 00-welcome-immediate.md
│   ├── day-1-reality-check.md
│   ├── day-2-non-negotiables.md
│   ├── day-3-energy-audit.md
│   ├── day-4-clear-the-noise.md
│   ├── day-5-vision-statement.md
│   ├── day-6-90-day-roadmap.md
│   ├── day-7-daily-clarity-practice.md
│   └── day-8-bonus-checkin.md
├── lib/
│   └── utils.ts
├── public/
│   └── book-cover.png
├── components.json
├── package.json
└── PROJECT_SUMMARY.md    # This file
```

---

## Notes for Next Session

- Book cover dimensions are now optimized (no cropping)
- Form button has yellow→green state change
- All 9 emails written and ready for ESP integration
- GitHub repo is public and connected to Vercel
- Deployment happens automatically on push to main

---

## Contact / Social Links

- **YouTube:** https://www.youtube.com/@AmazeMotivation4u
- **Facebook:** https://www.facebook.com/profile.php?id=61554270534544
- **Instagram:** https://www.instagram.com/amaze_motivation/reels/
