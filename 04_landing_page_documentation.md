# 04_landing_page_documentation.md

# Amaze Motivation — Landing Page Documentation

## Overview

The "7 Days to Clarity" landing page serves as the primary entry point for new subscribers. It exists to convert visitors into leads by offering a free guided self-reflection workbook.

**Live URL:** https://amaze-motivation.com

**V2 Variant:** https://amaze-motivation.com/lead-magnet-v2

---

## Page Versions

### Version 1 (Main)
- **URL:** `/`
- **Color Scheme:** Violet/Purple/Amber gradients
- **Font:** Playfair Display (headings), Inter (body)

### Version 2 (Alternative)
- **URL:** `/lead-magnet-v2`
- **Color Scheme:** Deep purple (#34285a), purple (#873da6), gold (#faa21b), cream (#fbf9f5)
- **Difference:** Alternative visual styling, same content structure

---

## Page Structure

### 1. Header (Fixed)
- Logo: Text-based "Amaze Motivation"
- Navigation:
  - "What's Inside" button (scrolls to 7-day guide section)
  - "Get the Free Guide" CTA button (scrolls to form)
- Mobile: Hamburger menu

### 2. Hero Section (Above Fold)
**Elements:**
- Eyebrow: "FREE 7-DAY SELF-REFLECTION GUIDE"
- Main Headline: "7 Days to Clarity"
- Supporting: "Pause the noise. Understand your patterns. Reset your direction."
- Body copy explaining the guide
- **Opt-in Form** (name + email fields)
- Secondary CTA: "See What's Inside"
- Value strip: "7 guided exercises • Printable worksheets • 10 min/day • Instant access"
- Book mockup visual

**Form Fields:**
- Name (required)
- Email (required)
- Button: "Send Me the Free Guide"

### 3. Problem-Awareness Section
**Eyebrow:** "WHEN PUSHING HARDER ISN'T WORKING"

**Copy:**
"You may not need more motivation. You may need space to hear yourself."

Addresses the feeling of being busy but not clear, ambitious but scattered.

### 4. Three Key Outcomes Section
**Background:** #FEF9F3 (cream)

**Three Cards:**
1. **Understand Your Patterns** (purple icon)
   - "Recognize the situations, reactions and behaviours that keep repeating"
   
2. **Clear the Mental Noise** (amber icon)
   - "Bring unresolved decisions, emotions and concerns into focus"
   
3. **Reset with Intention** (purple icon)
   - "Reconnect with the person you are becoming and choose one grounded step"

### 5. What's Included Section
**Four Features:**
- Guided Reflection Questions
- One Daily Action
- Printable Worksheets
- Just 10 Minutes a Day

### 6. 7-Day Guide Preview (Carousel)
**Eyebrow:** "INSIDE THE GUIDE"

**7 Days:**
| Day | Theme | Focus |
|-----|-------|-------|
| 1 | Pause | Create space before taking another step |
| 2 | Patterns | Notice what keeps repeating |
| 3 | Clarity | Name what is draining your attention |
| 4 | Emotions | Acknowledge what you have been avoiding |
| 5 | Control | Release what was never yours to carry |
| 6 | Identity | Recognize who you are becoming |
| 7 | Reset | Choose what you want to carry forward |

Each day has a quote and explanation in an interactive carousel.

### 7. Testimonials Section
**Format:** Circular Testimonials Component

**Testimonials:**
- **Sarah Mitchell** (Marketing Manager)
- **James Kim** (Startup Founder)  
- **Amanda Liu** (Teacher & Mom of 2)

All written in authentic, conversational tone—not generic marketing speak.

### 8. Recognition Section ("This guide is for you if...")
**7-item checklist:**
- You are ambitious but mentally scattered
- You spend too much time overthinking decisions
- You keep noticing the same situations or emotional patterns repeating
- You are busy, but unsure whether you are moving in the right direction
- You feel responsible for too many things at once
- You sense that you are changing, but cannot yet explain what is changing
- You want meaningful self-reflection without complicated theory

### 9. FAQ Section
**6 Questions:**
- How much time does each exercise take?
- Is this a productivity planner?
- Do I need to know what I want before starting?
- What is included?
- How will I receive the guide?
- Is the guide really free?

### 10. Final CTA Section
**Dark gradient background** with:
- "Your reset can begin today"
- Headline: "You do not need to figure everything out right now"
- **Opt-in Form** (name + email)
- Button: "Start My 7-Day Clarity Reset"

### 11. Thank You Page
**URL:** `/thank-you`

**Shows after form submission:**
- Success icon with checkmark
- "You're In!" heading
- "What's Next" instructions
- Links to YouTube and Instagram
- "Back to Home" link

### 12. Footer
- Brand: "Amaze Motivation"
- Tagline: "Reflect. Understand. Grow."
- Social links: YouTube, Facebook, Instagram
- Footer links: Privacy, Terms, Contact
- Copyright

---

## Copywriting Principles Used

### Tone
- Calm, not urgent
- Inviting, not demanding
- Conversational, not corporate
- Emotionally intelligent, not hype-driven

### Avoided
- "Crush your goals"
- "10X your results"
- "Dominate"
- "Hustle harder"
- "Become unstoppable"
- False urgency (countdowns, "spots limited")

### Emphasized
- Slowing down
- Noticing patterns
- Self-awareness
- Honesty
- Compassion
- Small, manageable steps

---

## Technical Implementation

### Tech Stack
- **Framework:** Next.js 16.2.6 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion / motion
- **Forms:** React hooks (useState)

### File Structure
```
app/
├── layout.tsx                  # Root layout with favicon links
├── page.tsx                    # Main landing page (v1)
├── lead-magnet-v2/
│   └── page.tsx               # Alternative landing page (v2)
├── thank-you/
│   └── page.tsx               # Post-optin thank you page
└── api/
    └── submit-lead/
        └── route.ts          # ActiveCampaign API endpoint

components/ui/
├── carousel.tsx                # 7-day guide carousel
└── circular-testimonials.tsx  # Testimonials component

public/
├── logo.png                   # Main logo (AM icon)
├── favicon.png                # Browser tab icon (32x32)
├── icon.png                   # Android/Chrome icon (192x192)
├── apple-touch-icon.png       # iOS icon (180x180)
├── book-cover.png             # Guide book mockup
└── testimonials/
    ├── sarah.jpg
    ├── james.jpg
    └── amanda.jpg
```

---

## Funnel Flow

```
Visitor Lands
     ↓
Views Hero Section
     ↓
Sees Problem-Awareness
     ↓
Views 3 Outcomes
     ↓
Sees What's Included
     ↓
Views 7-Day Preview
     ↓
Sees Testimonials
     ↓
Clicks CTA / Scrolls to Form
     ↓
Enters Name + Email
     ↓
Submits Form
     ↓
POST /api/submit-lead
     ↓
ActiveCampaign API
     ↓
Redirect: /thank-you
     ↓
Sees Success Message
     ↓
Follows Social Links (optional)
```

---

## ActiveCampaign Integration

### API Endpoint
**Route:** `POST /api/submit-lead`

**Environment Variables:**
- `ACTIVECAMPAIGN_API_URL=https://amazemotivation.api-us1.com`
- `ACTIVECAMPAIGN_API_KEY=[API key]`
- `ACTIVECAMPAIGN_LIST_ID=[optional]`

### Flow
1. Form submits name and email
2. API checks if contact already exists
3. If new: Creates contact with firstName/lastName split
4. If list ID configured: Adds contact to list
5. On success: Redirects to thank you page
6. On error: Falls back to localStorage

### Vercel Configuration
Environment variables must be added in:
- Vercel Dashboard → Project Settings → Environment Variables
- Or via CLI: `vercel env add`

---

## SEO & Metadata

```typescript
title: "7 Days to Clarity | Free Guided Self-Reflection Workbook"
description: "Download the free 7 Days to Clarity guide and use seven simple reflection exercises to understand your patterns, clear mental noise and reset your direction."
keywords: ["motivation", "clarity", "self-reflection", "personal development", "mental clarity", "mindfulness"]
```

---

## Assets & Branding

### Logo
- **Type:** AM icon (stylized letters)
- **Format:** PNG with transparent background
- **Usage:** Favicon, browser icon

### Colors (V1)
- Primary: Violet (#8B5CF6), Purple (#A78BFA)
- Accent: Amber (#F59E0B), Yellow (#FBBF24)
- Background: Violet-50, Purple-50 gradients

### Colors (V2)
- Primary: #34285a (deep purple), #873da6 (purple)
- Accent: #faa21b (gold), #ffb961 (light gold)
- Background: #fbf9f5 (cream)

### Typography
- **Headlines:** Playfair Display
- **Body:** Inter
- **Navigation:** Geist Sans

---

## Deployment

### Repository
**GitHub:** https://github.com/jasonsoh91-hub/amaze-motivation

### Vercel
**Project:** amaze-motivation-landing  
**Team:** jasonsoh91-4934s-projects  
**Production URL:** https://amaze-motivation.com

### Deploy Commands
```bash
# Build locally
npm run build

# Deploy to production
vercel --prod

# Add environment variable
vercel env add ACTIVECAMPAIGN_API_URL production --value "..."
```

---

## Future Enhancements

### Planned
- [ ] Add A/B testing for headlines
- [ ] Add conversion tracking (Google Analytics, Meta Pixel)
- [ ] Add exit-intent popup
- [ ] Create additional lead magnet variants
- [ ] Add progress tracking for workbook completion

### Under Consideration
- [ ] Video walkthrough of the guide
- [ ] Social proof counter (e.g., "10,000+ downloads")
- [ ] Email prewarm series preview
- [ ] Mobile-first optimizations

---

## Maintenance Notes

### Regular Tasks
- Monitor ActiveCampaign for deliverability issues
- Update testimonials as new feedback comes in
- Review and refresh seasonal imagery if needed
- Check form submission rates monthly

### Technical Debt
- Consider extracting form component to reduce duplication
- Schema.org structured data for SEO
- Accessibility audit for WCAG compliance
- Image optimization for faster loading

---

## Version History

| Date | Change |
|------|--------|
| 2026-06-07 | Initial launch with ActiveCampaign integration |
| 2026-06-07 | Added circular testimonials component |
| 2026-06-07 | Created v2 landing page with alternative color scheme |
| 2026-06-07 | Added thank you page with redirect flow |
| 2026-06-07 | Integrated ActiveCampaign API for lead capture |
| 2026-06-07 | Added logo and favicon |
| 2026-06-08 | Removed logo image, reverted to text branding |
