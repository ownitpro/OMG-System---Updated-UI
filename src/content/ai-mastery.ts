import {
  BookOpenIcon,
  AcademicCapIcon,
  SparklesIcon,
  ClockIcon,
  BoltIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  DocumentTextIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  ClipboardDocumentCheckIcon,
  QrCodeIcon,
  IdentificationIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const analytics = {
  view: "ai_mastery_view",
  ctaClick: "ai_mastery_cta_click",
} as const;

export const hero = {
  title: "Become AI-smart in days, not months.",
  subtitle: "Unlock faster work, clearer thinking, and real results with OMG AI Mastery.",
  description: "Whether you're a busy professional or a leader running a full team, this course teaches you how to use AI the right way with simple steps, real examples, and tools you can use today.",
  benefits: [
    "Learn AI fast: 3 days for individuals, 2 weeks for businesses",
    "Use AI with confidence (no tech background required)",
    "Boost writing, planning, selling, and decision-making",
    'Move from "random prompts" to "I know exactly what to say"',
  ],
  primaryCta: {
    label: "Start Learning Now",
    href: "/app/login",
  },
  secondaryCta: {
    label: "See Course Details",
    href: "#course-details",
  },
  coursePaths: {
    individual: {
      label: "For Individuals",
      title: "3-Day Personal Course",
      description: "Learn how to write, plan, and learn faster with AI at your own pace.",
    },
    business: {
      label: "For Businesses",
      title: "2-Week Team Bootcamp",
      description: "Train your whole team to use AI with clear systems, guardrails, and real results.",
    },
  },
  footnote: "Includes a built-in AI Playground and a professional, verifiable certificate with QR code.",
} as const;

export const painPoints = [
  {
    text: "You try prompting… but the answers feel generic.",
    shortText: "Generic answers",
  },
  {
    text: "You know AI is powerful… but you don't know how to use it for your life or work.",
    shortText: "No direction",
  },
  {
    text: "Your team is using AI randomly with no standards, no guardrails.",
    shortText: "No standards",
  },
  {
    text: "You're overwhelmed by tutorials, features, and shiny tools.",
    shortText: "Overwhelmed",
  },
  {
    text: "You're worried you'll fall behind if you don't start learning now.",
    shortText: "Falling behind",
  },
] as const;

export const solutionFeatures = [
  {
    icon: BookOpenIcon,
    title: "Clear Lessons",
    description: "No big words. No confusing tech jargon. Just real steps that work in your everyday life and business.",
  },
  {
    icon: LightBulbIcon,
    title: "Practical Examples",
    description: "We use real emails, planning, sales, content, and operations scenarios: the same things you're already doing.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Hands-on Practice",
    description: "You actually build systems while learning, so you can use them the same day.",
  },
  {
    icon: SparklesIcon,
    title: "AI Playground",
    description: "Learn → practice → apply, all inside one guided space. No bouncing between twenty tools.",
  },
  {
    icon: UserGroupIcon,
    title: "Dual Paths",
    description: "One path for individuals, one for teams, one goal: confidence and real results with AI.",
  },
  {
    icon: AcademicCapIcon,
    title: "Certification",
    description: "Your certificate is professional, scannable via QR code, and ready for resumes, promotions, and internal records.",
  },
] as const;

export const individualCourse = {
  label: "For Individuals",
  title: "3-Day Personal Course",
  description: "Perfect for students, creators, job seekers, freelancers, and professionals who want to use AI better in daily life and work.",
  features: [
    "How to talk to AI so it really understands you.",
    "How to write better, faster, and clearer.",
    "How to plan your day, week, or life with AI.",
    "How to learn anything quicker using AI.",
    "How to create systems you can reuse forever.",
  ],
  footnote: "Most learners feel a clear difference in 3 days or less, and you can always go at your own pace.",
  cta: {
    label: "Start the 3-Day Personal Course",
    href: "/app/login",
  },
} as const;

export const businessCourse = {
  label: "For Businesses & Teams",
  title: "2-Week Team Bootcamp",
  description: "Perfect for companies, departments, and leaders who want consistent, safe, high-impact AI use across the organization.",
  features: [
    "Clear AI systems for writing, planning, and communication.",
    "Turn messy processes into SOPs, checklists, and workflows.",
    "Improve sales follow-ups and objection practice.",
    "Create reusable marketing systems and templates.",
    "Set guardrails and safe data usage rules.",
    "Manager-only tips, team defaults, and progress tracking.",
  ],
  footnote: "Teams can be fully up and running in about 2 weeks without overwhelming staff.",
  cta: {
    label: "Enroll Your Entire Team",
    href: "/app/login",
  },
} as const;

export const whyItWorks = [
  {
    icon: BookOpenIcon,
    title: "Simple Language",
    description: "Anyone can learn.",
  },
  {
    icon: LightBulbIcon,
    title: "Real Examples",
    description: "From real teams and workflows.",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Clear Steps",
    description: 'Not random "tips & tricks."',
  },
  {
    icon: SparklesIcon,
    title: "Friendly Style",
    description: "Motivating, not intimidating.",
  },
  {
    icon: BoltIcon,
    title: "Plug-in Systems",
    description: "Use them right away.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Safe Path",
    description: "Not a confusing YouTube mess.",
  },
] as const;

export const individualBuilds = [
  {
    icon: PencilSquareIcon,
    title: "Writing Assistant",
    description: "A personal writing assistant that helps you write faster and clearer.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Planning System",
    description: "A planning and productivity system for your days, weeks, and projects.",
  },
  {
    icon: AcademicCapIcon,
    title: "Learning Coach",
    description: "A learning coach system to help you understand anything quicker.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Research Assistant",
    description: "A research assistant that organizes ideas and information for you.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Custom Tools",
    description: "Custom AI tools you can reuse every day in your life and work.",
  },
] as const;

export const businessBuilds = [
  {
    icon: PhoneIcon,
    title: "Sales Follow-up",
    description: "Sales follow-up systems your team can actually use.",
  },
  {
    icon: DocumentTextIcon,
    title: "Content Systems",
    description: "Content and marketing systems with reusable prompts and templates.",
  },
  {
    icon: CogIcon,
    title: "SOPs & Operations",
    description: "SOP and operations systems built from your real processes.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Communication Templates",
    description: "Internal communication templates so messages stay clear and consistent.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Team Guardrails",
    description: "Team standards, guardrails, and a manager dashboard for tracking progress.",
  },
] as const;

export const certificationBenefits = [
  {
    icon: BriefcaseIcon,
    title: "Job Applications",
    description: 'Stand out by showing you\'re AI-smart, not just "curious."',
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Promotions",
    description: "Prove you're ready to lead with AI, not get dragged behind it.",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Team Records & Compliance",
    description: "Give HR and leadership a clean record of who's trained and how.",
  },
] as const;

export const certificationFeatures = [
  { icon: QrCodeIcon, label: "QR Code Verify" },
  { icon: IdentificationIcon, label: "Unique ID" },
  { icon: CheckCircleIcon, label: "Instant Verify" },
  { icon: AcademicCapIcon, label: "Professional" },
] as const;

export const pricingPlans = [
  {
    type: "individual",
    title: "For Individuals",
    subtitle: "One-Time Purchase",
    description: "One-time course purchase, with an option to add ongoing membership if you want support, updates, or extra systems later.",
    features: [
      "Full course access",
      "AI Playground included",
      "Professional certificate",
      "Lifetime access",
    ],
    cta: {
      label: "Start Learning",
      href: "/app/signup?track=personal",
    },
    popular: false,
  },
  {
    type: "business",
    title: "For Businesses & Teams",
    subtitle: "Team Bootcamp",
    description: "One-time bootcamp for the full rollout, plus optional monthly access if you want to keep training, tracking, and improving over time.",
    features: [
      "Full team training",
      "Manager dashboard",
      "Team certificates",
      "Progress tracking",
    ],
    cta: {
      label: "Contact for Teams",
      href: "/contact?topic=ai-mastery-teams",
    },
    popular: true,
  },
] as const;

export const faqs = [
  {
    question: "Do I need to be technical to take this course?",
    answer: "No. If you can type a sentence, you can follow this course. Everything is written in simple language.",
  },
  {
    question: "Which AI tools do I need?",
    answer: "You can use ChatGPT, Claude, Gemini, or other large language models. The course teaches skills and systems that work across tools, not just one platform.",
  },
  {
    question: "How long do I have access?",
    answer: "You can complete the course at your own pace. You decide how fast you move through the lessons and practice sessions.",
  },
  {
    question: "Is this just theory or real practice?",
    answer: "You'll practice inside a guided AI Playground. You build real prompts, systems, and workflows while you learn.",
  },
] as const;

export const finalCta = {
  title: 'You don\'t need to be "techy" to get good at AI.',
  subtitle: "You just need a guide. OMG AI Mastery gives you a clear path in 3 days for individuals, or 2 weeks for teams.",
  primaryCta: {
    label: "Start Learning Now",
    href: "/app/signup",
  },
  secondaryCta: {
    label: "Enroll Your Team",
    href: "/contact?topic=ai-mastery-teams",
  },
} as const;
