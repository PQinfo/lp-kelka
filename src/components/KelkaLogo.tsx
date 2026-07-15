interface KelkaLogoProps {
  className?: string;
  variant?: "light" | "dark" | "gradient";
}

export default function KelkaLogo({ className = "h-9", variant = "light" }: KelkaLogoProps) {
  const isGradient = variant === "gradient";

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "3000 / 757" }}>
      {/* White version */}
      <img
        src="/lp-kelka/logo-horizontal.png"
        alt="Kelka"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: "brightness(0) invert(1)",
          opacity: isGradient ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />
      {/* Gradient version */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #5CCDA7 0%, #00A2D6 100%)",
          WebkitMaskImage: "url('/lp-kelka/logo-horizontal.png')",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: "url('/lp-kelka/logo-horizontal.png')",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          opacity: isGradient ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}
