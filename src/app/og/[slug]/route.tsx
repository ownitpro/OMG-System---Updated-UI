import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SEO_CONFIG, INDUSTRY_SEO, APP_SEO } from "@/lib/seo";

export const runtime = "edge";

// Industry icons mapping
const industryIcons = {
  "property-management": "🏢",
  "real-estate": "🏠", 
  "contractors": "🔨",
  "accounting": "🧮",
  "cleaning": "🧹",
  "healthcare": "🏥",
} as const;

// App icons mapping
const appIcons = {
  "securevault-docs": "🔒",
  "industryiq": "📊",
  "crm": "👥",
  "leadflow": "🎯",
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // Get page-specific data
  let title = "OMGsystems";
  let subtitle = "Automate the busywork. Grow faster.";
  let icon = "⚡";

  if (slug === "home") {
    title = "Automation that pays for itself.";
    subtitle = "Built in Canada, launches in 1–3 weeks.";
  } else if (slug in INDUSTRY_SEO) {
    const industryData = INDUSTRY_SEO[slug as keyof typeof INDUSTRY_SEO];
    title = industryData.title.replace(" | OMGsystems", "");
    subtitle = industryData.description;
    icon = industryIcons[slug as keyof typeof industryIcons] || "⚡";
  } else if (slug in APP_SEO) {
    const appData = APP_SEO[slug as keyof typeof APP_SEO];
    title = appData.title.split(" - ")[0];
    subtitle = appData.description;
    icon = appIcons[slug as keyof typeof appIcons] || "⚡";
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1220",
          backgroundImage: "linear-gradient(135deg, #0B1220 0%, #1a2332 50%, #0B1220 100%)",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Diagonal accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "100%",
            background: `linear-gradient(135deg, transparent 0%, ${SEO_CONFIG.defaults.accentColor}20 50%, transparent 100%)`,
            transform: "skewX(-15deg)",
            transformOrigin: "top right",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            OMGsystems
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 60px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: "120px",
              marginBottom: "40px",
              filter: "drop-shadow(0 0 20px rgba(0, 226, 199, 0.3))",
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#FFFFFF",
              lineHeight: "1.1",
              marginBottom: "24px",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#A1A1AA",
              lineHeight: "1.4",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Tagline at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            fontSize: "20px",
            color: SEO_CONFIG.defaults.accentColor,
            fontWeight: "600",
            letterSpacing: "0.05em",
          }}
        >
          {SEO_CONFIG.brand.tagline}
        </div>
      </div>
    ),
    {
      width: SEO_CONFIG.openGraph.image.width,
      height: SEO_CONFIG.openGraph.image.height,
    }
  );
}
