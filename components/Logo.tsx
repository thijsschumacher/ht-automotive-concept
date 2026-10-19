/*
 * HT Automotive-logo als inline SVG: schuine, vette wordmark met een turquoise
 * swoosh in de vorm van een autodak. `variant="dark"` is voor donkere achtergronden.
 */

type Props = {
  variant?: "light" | "dark";
  /** Alleen het HT-monogram met swoosh (compact, voor mobiel) */
  compact?: boolean;
  className?: string;
};

const SWOOSH = "#14b4cc";

export default function Logo({ variant = "light", compact = false, className }: Props) {
  const text = variant === "dark" ? "#ffffff" : "#0B1B33";

  if (compact) {
    return (
      <svg viewBox="0 0 72 48" className={className} role="img" aria-label="HT Automotive">
        <path d="M4 20 C18 6 46 2 68 14 C50 8 24 10 6 22 Z" fill={SWOOSH} />
        <text
          x="6"
          y="44"
          fill={text}
          fontSize="30"
          fontWeight="900"
          fontStyle="italic"
          letterSpacing="-1"
          transform="skewX(-8)"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          HT
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 54" className={className} role="img" aria-label="HT Automotive">
      {/* Autodak-swoosh */}
      <path d="M6 20 C34 7 74 2 122 3 C153 4 178 10 202 21 C176 13 151 8.5 122 8.5 C76 8 38 12 6 20 Z" fill={SWOOSH} />
      <text
        x="14"
        y="50"
        fill={text}
        fontSize="31"
        fontWeight="900"
        fontStyle="italic"
        textLength="200"
        lengthAdjust="spacingAndGlyphs"
        transform="skewX(-8)"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        HT Automotive
      </text>
    </svg>
  );
}
