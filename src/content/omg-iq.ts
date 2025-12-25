import {
  SparklesIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  BoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const analytics = {
  view: "omgiq_view",
  ctaClick: "omgiq_cta_click",
} as const;

export const hero = {
  title: "Turn industry noise into daily smart moves.",
  subtitle: "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
  primaryCta: {
    label: "Get Started",
    href: "/apps/demo?app=omg-iq",
  },
  secondaryCta: {
    label: "See a Sample Digest",
    href: "/apps/omg-iq/sample",
  },
} as const;

export const whatItDoes = [
  "Picks your industries (up to 10).",
  "Scans trusted sources daily.",
  "Summarizes into plain English.",
  "Sends it to you by SMS or WhatsApp.",
  "Tracks what you open and improves over time.",
] as const;

export const industries = [
  { name: "Real Estate", icon: "🏠", color: "from-blue-500 to-blue-600" },
  { name: "Construction", icon: "🏗️", color: "from-orange-500 to-orange-600" },
  { name: "HVAC", icon: "❄️", color: "from-cyan-500 to-cyan-600" },
  { name: "Creative", icon: "🎨", color: "from-purple-500 to-purple-600" },
  { name: "Consulting", icon: "💼", color: "from-indigo-500 to-indigo-600" },
  { name: "Education", icon: "📚", color: "from-green-500 to-green-600" },
  { name: "Finance", icon: "💰", color: "from-emerald-500 to-emerald-600" },
  { name: "Health", icon: "🏥", color: "from-red-500 to-red-600" },
  { name: "Hospitality", icon: "🍽️", color: "from-amber-500 to-amber-600" },
  { name: "Retail", icon: "🛍️", color: "from-pink-500 to-pink-600" },
] as const;

export const whyTeamsLoveIt = [
  {
    icon: SparklesIcon,
    title: "Simple",
    description: "Short, skimmable digests. No fluff.",
  },
  {
    icon: ClockIcon,
    title: "Timely",
    description: "Set your cadence (daily or weekly).",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Everywhere",
    description: "SMS (AWS SNS) and WhatsApp (Amazon Pinpoint).",
  },
  {
    icon: ChartBarIcon,
    title: "Personalized",
    description: "Choose the industries you care about.",
  },
  {
    icon: BoltIcon,
    title: "Fast setup",
    description: "Start in minutes—no heavy training needed.",
  },
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Choose your plan & industries",
    description: "Pick Base (1 industry), Entrepreneur (5), or Premium (10).",
  },
  {
    step: "2",
    title: "Set your channels",
    description: "Turn on SMS or WhatsApp. It's a quick one-time setup.",
  },
  {
    step: "3",
    title: "Pick your cadence",
    description: "Daily or weekly—change anytime.",
  },
  {
    step: "4",
    title: "Get your digests",
    description: "We send clear, useful insights with your name on it.",
  },
  {
    step: "5",
    title: "Refine & grow",
    description: "Add/remove industries. Upgrade or downgrade in one click.",
  },
] as const;

export const keyFeatures = [
  {
    title: "Multi-industry coverage",
    description: "Track 1–10 industries per account.",
  },
  {
    title: "Channel delivery",
    description: "Email and SMS delivery options.",
    bullets: ["Email", "SMS"],
  },
  {
    title: "Clean onboarding",
    description: "Simple from sign-up to first digest.",
  },
  {
    title: "Home dashboard",
    description: "\"Welcome, {Name}\"—shows plan, industries, cadence, and simple upgrade/downgrade.",
  },
  {
    title: "Self-serve messaging setup",
    description: "Clients enter their own WhatsApp (Pinpoint) details—no secrets shared.",
  },
  {
    title: "Activity feed",
    description: "See what's been sent and when, with icons for SMS/WhatsApp.",
  },
  {
    title: "Admin controls (back office)",
    description: "Cost guardrails, FX setting, monthly snapshots, audit-ready.",
  },
] as const;

export const pricingPlans = [
  {
    name: "Base",
    price: "$9.99",
    description: "For solo operators.",
    popular: false,
    features: [
      "1 industry",
      "SMS/WhatsApp delivery",
      "Dashboard",
      "Upgrade anytime",
    ],
  },
  {
    name: "Entrepreneur",
    price: "$19.99",
    description: "For growing teams.",
    popular: true,
    features: [
      "Up to 5 industries",
      "Channel delivery",
      "Dashboard",
      "Activity feed",
      "Priority updates",
    ],
  },
  {
    name: "Premium",
    price: "$29.99",
    description: "For builders who want it all.",
    popular: false,
    features: [
      "Up to 10 industries",
      "Channel delivery",
      "Dashboard",
      "Activity feed",
      "Priority support",
    ],
  },
] as const;

export const integrations = [
  {
    title: "AWS SNS for SMS",
    description: "Global reach, robust deliverability.",
    icon: "📱",
  },
  {
    title: "Amazon Pinpoint for WhatsApp",
    description: "Approved templates, compliant outreach.",
    icon: "💬",
  },
  {
    title: "Your branding",
    description: "Works with your number and your WhatsApp Business setup—your clients get consistent branding.",
    icon: "🎨",
  },
] as const;

export const securityTrust = [
  {
    icon: ShieldCheckIcon,
    title: "Modern auth",
    description: "Role-based access (Admin/User).",
  },
  {
    icon: GlobeAltIcon,
    title: "Data privacy",
    description: "You control your industries and delivery settings.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Infrastructure",
    description: "Built on AWS with strong security practices.",
  },
  {
    icon: CheckCircleIcon,
    title: "Compliance-minded",
    description: "WhatsApp templates and explicit opt-in where required.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need the WhatsApp API?",
    a: "For automated WhatsApp delivery, yes—OMGIQ uses Amazon Pinpoint with your approved templates. If you're not ready yet, use SMS or set up Pinpoint later in two minutes.",
  },
  {
    q: "Can I change industries later?",
    a: "Yes. Add/remove industries anytime. Your plan sets the max.",
  },
  {
    q: "How often do you send?",
    a: "Daily or weekly—your choice. You can pause or change cadence anytime.",
  },
  {
    q: "What sources do you use?",
    a: "We focus on high-signal industry sources. Over time we tune based on what you open and request.",
  },
  {
    q: "Can my team receive the same digest?",
    a: "Yes—share the channel or add teammates to your plan.",
  },
] as const;

export const finalCta = {
  title: "Ready to turn noise into action?",
  subtitle: "Start your free 7-day trial and see how OMGIQ keeps you ahead without the time sink.",
  primaryCta: {
    label: "Start now (free 7-day trial)",
    href: "/apps/demo?app=omg-iq",
  },
  secondaryCta: {
    label: "See a sample digest",
    href: "/apps/omg-iq/sample",
  },
} as const;
