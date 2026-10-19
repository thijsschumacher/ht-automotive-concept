/*
 * HT Automotive – conceptwebsite (salesconcept Forever in Business)
 *
 * FOTO'S: dit concept gebruikt bewust geen foto's. Echte beelden van de werkplaats
 * kunnen later op deze plekken worden ingevuld (zet ze in /public en gebruik next/image):
 *   1. Hero            -> vervang/aanvul <HeroArt /> met een foto van de werkplaats of een auto op de brug
 *   2. Dienstkaarten   -> optioneel een foto per dienst boven het icoon (APK, onderhoud, zomer/wintercheck)
 *   3. Over ons        -> vervang het blok <FoundersVisual /> door een foto van Bilal en Najim
 */

import type { ReactNode } from "react";

const PHONE_DISPLAY = "(0174) 628 395";
const PHONE_HREF = "tel:+31174628395";
const EMAIL = "info@htautomotive.nl";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Afspraak aanvragen")}`;
const ADDRESS_LINE_1 = "Ambachtstraat 1a";
const ADDRESS_LINE_2 = "2671 CN Naaldwijk";
const MAPS_QUERY = encodeURIComponent(`${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`);
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const ROUTE_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

// TODO: openingstijden invullen zodra bekend, bijv. [{ day: "Maandag t/m vrijdag", hours: "08:00 – 17:30" }]
const OPENING_HOURS: { day: string; hours: string }[] = [];

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#diensten", label: "Diensten" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#afspraak", label: "Afspraak maken" },
  { href: "#contact", label: "Contact" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "HT Automotive",
  telephone: "+31174628395",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINE_1,
    postalCode: "2671 CN",
    addressLocality: "Naaldwijk",
    addressCountry: "NL",
  },
  founder: [
    { "@type": "Person", name: "Bilal Tahayekt" },
    { "@type": "Person", name: "Najim el Haddioui" },
  ],
  paymentAccepted: "Pin",
};

/* ---------- Iconen (inline SVG) ---------- */

function Icon({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const icons = {
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  car: (
    <>
      <path d="M3 13l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
      <circle cx="7.5" cy="15.5" r="1" />
      <circle cx="16.5" cy="15.5" r="1" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5v2.5M12 3.5v2.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2L19 4M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  clipboard: (
    <>
      <path d="M15 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  thermo: (
    <>
      <path d="M14 14.76V4.5a2 2 0 1 0-4 0v10.26a4 4 0 1 0 4 0z" />
      <path d="M12 9v7" />
      <path d="M18 5h3M18 9h3M18 13h2" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

/* ---------- Auto-silhouet ---------- */

function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 130" className={className} aria-hidden="true">
      <path
        d="M20 85 C20 75 28 70 40 68 L95 62 C115 45 140 32 175 30 L245 30 C270 30 290 42 310 58 L355 64 C372 67 382 74 382 85 L382 92 C382 95 380 97 377 97 L340 97 A30 30 0 0 0 280 97 L130 97 A30 30 0 0 0 70 97 L25 97 C22 97 20 95 20 92 Z"
        fill="currentColor"
      />
      <path d="M122 62 L170 38 L204 38 L204 62 Z M214 38 L244 38 C262 38 278 48 292 60 L214 62 Z" fill="#070b14" opacity="0.55" />
      <circle cx="310" cy="97" r="24" fill="currentColor" />
      <circle cx="100" cy="97" r="24" fill="currentColor" />
      <circle cx="310" cy="97" r="10" fill="#070b14" opacity="0.5" />
      <circle cx="100" cy="97" r="10" fill="#070b14" opacity="0.5" />
    </svg>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="HT Automotive, naar boven">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-500 text-white shadow-sm">
        <svg viewBox="0 0 40 24" className="h-4 w-7" aria-hidden="true">
          <path
            d="M2 17c0-2 1.4-3 3-3.3L10 13c2-3 4.5-5 8-5h6c3 0 5 1.6 7 4l5 .8c1.6.3 2 1.3 2 2.6V18H2z"
            fill="currentColor"
          />
          <circle cx="10" cy="18.5" r="3" fill="currentColor" />
          <circle cx="30" cy="18.5" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink-900"}`}>
        HT <span className="text-accent-500">Automotive</span>
      </span>
    </a>
  );
}

/* ---------- Secties ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-slate-600">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-accent-600">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            <Icon className="h-4 w-4">{icons.phone}</Icon>
            Bel ons
          </a>
          {/* Mobiel menu zonder JavaScript */}
          <details className="group relative lg:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-slate-200 text-ink-900 [&::-webkit-details-marker]:hidden"
              aria-label="Menu openen"
            >
              <Icon className="h-5 w-5">{icons.menu}</Icon>
            </summary>
            <nav
              aria-label="Mobiel menu"
              className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
            >
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-accent-50 hover:text-accent-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function HeroArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Gloed */}
      <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent-700/20 blur-3xl" />
      {/* Lichtlijnen */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="streak" x1="0" x2="1">
            <stop offset="0" stopColor="#2bbcd6" stopOpacity="0" />
            <stop offset="0.6" stopColor="#2bbcd6" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2bbcd6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-50 620 C300 560 700 590 1250 470" stroke="url(#streak)" strokeWidth="1.5" fill="none" />
        <path d="M-50 660 C350 610 750 640 1250 540" stroke="url(#streak)" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M-50 700 C400 660 800 690 1250 610" stroke="url(#streak)" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M-50 180 C400 230 800 140 1250 210" stroke="url(#streak)" strokeWidth="0.6" fill="none" opacity="0.3" />
      </svg>
      {/* Raster */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* Auto */}
      <CarSilhouette className="absolute -right-24 bottom-10 w-[46rem] max-w-none text-white/[0.07] sm:-right-10 lg:bottom-16 lg:right-0 lg:w-[52rem]" />
      <div className="absolute bottom-10 right-0 h-px w-2/3 bg-gradient-to-l from-accent-400/60 to-transparent lg:bottom-16" />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-800 text-white"
    >
      <HeroArt />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-accent-100">
          <span className="h-2 w-2 rounded-full bg-accent-400" />
          Erkend RDW APK-keuringsstation in Naaldwijk
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Betrouwbaar onderhoud en APK in <span className="text-accent-400">Naaldwijk</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Onderhoud, reparatie en APK voor alle merken auto&apos;s en lichte bedrijfswagens. U wacht met een
          gratis kopje koffie of thee.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#afspraak"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-400"
          >
            Maak een afspraak
            <Icon className="h-5 w-5">{icons.arrow}</Icon>
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <Icon className="h-5 w-5">{icons.phone}</Icon>
            Bel direct {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: icons.shield, label: "RDW erkend APK-station" },
    { icon: icons.car, label: "Alle merken" },
    { icon: icons.coffee, label: "Gratis koffie of thee" },
    { icon: icons.key, label: "Auto vooraf brengen mogelijk" },
  ];
  return (
    <div className="border-b border-slate-200 bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-7 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm font-semibold text-ink-900 sm:text-base">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600">
              <Icon className="h-5 w-5">{item.icon}</Icon>
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}

function Services() {
  const services = [
    {
      icon: icons.clipboard,
      title: "APK keuringen",
      text: "Wij zijn een erkend RDW APK-keuringsstation in Naaldwijk, Westland. Uw APK wordt vakkundig en zorgvuldig uitgevoerd, zodat u weer met een gerust gevoel de weg op gaat.",
    },
    {
      icon: icons.wrench,
      title: "Onderhoud & reparatie",
      text: "Voor alle merken auto's en lichte bedrijfswagens. Van olie verversen tot regulier onderhoud en reparaties: wij houden uw voertuig in topconditie.",
    },
    {
      icon: icons.thermo,
      title: "Zomer- & wintercheck",
      text: "Met onze seizoenscheck gaat uw auto of lichte bedrijfswagen veilig de zomer of winter in. Wij controleren de belangrijkste punten, zodat u niet voor verrassingen komt te staan.",
    },
  ];
  return (
    <section id="diensten" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Diensten"
          title="Alles voor uw auto onder één dak"
          intro="APK, onderhoud en reparatie aan alle merken auto's en lichte bedrijfswagens."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-xl hover:shadow-accent-500/10"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-900 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                <Icon className="h-7 w-7">{s.icon}</Icon>
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-600">{s.text}</p>
              <a
                href="#afspraak"
                className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-accent-500 hover:bg-accent-500 hover:text-white"
              >
                Meer info
                <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5">{icons.arrow}</Icon>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersVisual() {
  // Placeholder: vervang door een foto van Bilal en Najim in de werkplaats.
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-8 text-white shadow-xl sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" aria-hidden="true" />
      <CarSilhouette className="absolute -bottom-6 -right-10 w-96 text-white/[0.06]" />
      <p className="relative text-sm font-semibold uppercase tracking-widest text-accent-300">De oprichters</p>
      <ul className="relative mt-6 space-y-4">
        {["Bilal Tahayekt", "Najim el Haddioui"].map((name) => (
          <li key={name} className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-lg font-bold text-accent-300">
              {name
                .split(" ")
                .filter((p) => p[0] === p[0].toUpperCase())
                .map((p) => p[0])
                .join("")}
            </span>
            <span className="text-xl font-semibold">{name}</span>
          </li>
        ))}
      </ul>
      <p className="relative mt-8 max-w-sm text-slate-300">
        Een jong bedrijf met vakkennis, korte lijnen en persoonlijke aandacht voor elke klant.
      </p>
    </div>
  );
}

function About() {
  const perks = [
    { icon: icons.key, title: "Auto vooraf brengen", text: "Breng uw auto gerust van tevoren, dan staat hij klaar voor de afspraak." },
    { icon: icons.briefcase, title: "Flexibel voor bedrijven", text: "Flexibele openingstijden voor bedrijven met lichte bedrijfswagens." },
    { icon: icons.coffee, title: "Koffie of thee", text: "Wacht u tijdens de APK of reparatie? De koffie of thee staat klaar." },
  ];
  return (
    <section id="over-ons" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Over ons"
            title="Jong, persoonlijk en vakkundig"
            intro="HT Automotive is opgericht door Bilal Tahayekt en Najim el Haddioui. Als jong bedrijf verzorgen wij onderhoud, autoreparaties en APK aan alle merken auto's en lichte bedrijfswagens. Bij ons bent u geen nummer: we nemen de tijd, leggen uit wat we doen en denken met u mee."
          />
          <ul className="mt-10 space-y-6">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600">
                  <Icon className="h-5 w-5">{p.icon}</Icon>
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{p.title}</h3>
                  <p className="mt-1 text-slate-600">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <FoundersVisual />
      </div>
    </section>
  );
}

function Appointment() {
  const options = [
    { icon: icons.phone, title: "Bellen", text: PHONE_DISPLAY, cta: "Bel nu", href: PHONE_HREF, external: false },
    { icon: icons.mail, title: "Mailen", text: EMAIL, cta: "Stuur een e-mail", href: MAILTO, external: false },
    { icon: icons.pin, title: "Langskomen", text: `${ADDRESS_LINE_1}, Naaldwijk`, cta: "Plan uw route", href: ROUTE_URL, external: true },
  ];
  return (
    <section id="afspraak" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-300">Afspraak maken</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plan uw APK, onderhoud of reparatie</h2>
            <p className="mt-4 text-lg text-slate-300">
              Kies wat u het makkelijkst vindt. We reageren snel en plannen een moment dat u uitkomt.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {options.map((o) => (
              <a
                key={o.title}
                href={o.href}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-accent-400/60 hover:bg-white/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500 text-white">
                  <Icon className="h-6 w-6">{o.icon}</Icon>
                </span>
                <span className="mt-5 text-lg font-semibold">{o.title}</span>
                <span className="mt-1 break-words text-slate-300">{o.text}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-300">
                  {o.cta}
                  <Icon className="h-4 w-4 transition-transform group-hover:translate-x-1">{icons.arrow}</Icon>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ label, sub }: { label: string; sub: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 text-accent-600" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
        <path d="M8 12.5l2.5 2.5L16 9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>
        <span className="block font-semibold leading-tight text-ink-900">{label}</span>
        <span className="block text-sm text-slate-500">{sub}</span>
      </span>
    </li>
  );
}

function Contact() {
  const badges = [
    { label: "RDW erkend", sub: "APK-keuringsstation" },
    { label: "NAP", sub: "Nationale Auto Pas" },
    { label: "Bosch", sub: "Diagnose & onderdelen" },
    { label: "Airco Service Station", sub: "Aircoservice" },
    { label: "Kroon-Oil", sub: "Smeermiddelen" },
    { label: "Pinnen", sub: "Ja graag" },
  ];
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Kom gerust langs" />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
            <address className="space-y-5 not-italic">
              <div className="flex gap-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent-600">{icons.pin}</Icon>
                <div>
                  <p className="font-semibold text-ink-900">HT Automotive</p>
                  <p className="text-slate-600">{ADDRESS_LINE_1}</p>
                  <p className="text-slate-600">{ADDRESS_LINE_2}</p>
                </div>
              </div>
              <a href={PHONE_HREF} className="flex gap-4 text-slate-700 hover:text-accent-600">
                <Icon className="h-6 w-6 shrink-0 text-accent-600">{icons.phone}</Icon>
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex gap-4 break-all text-slate-700 hover:text-accent-600">
                <Icon className="h-6 w-6 shrink-0 text-accent-600">{icons.mail}</Icon>
                {EMAIL}
              </a>
              <div className="flex gap-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent-600">{icons.clock}</Icon>
                {OPENING_HOURS.length > 0 ? (
                  <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-slate-600">
                    {OPENING_HOURS.map((o) => (
                      <div key={o.day} className="contents">
                        <dt>{o.day}</dt>
                        <dd>{o.hours}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-slate-600">Openingstijden volgen</p>
                )}
              </div>
            </address>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 font-semibold text-white transition hover:bg-accent-600"
            >
              Bekijk op Google Maps
              <Icon className="h-4 w-4">{icons.arrow}</Icon>
            </a>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-ink-900">Keurmerken en partners</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {badges.map((b) => (
                <Badge key={b.label} {...b} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-950 pb-24 pt-14 text-slate-400 lg:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm">APK, onderhoud en reparatie aan alle merken auto&apos;s en lichte bedrijfswagens.</p>
        </div>
        <address className="space-y-1 text-sm not-italic">
          <p>
            {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
          </p>
          <p>
            <a href={PHONE_HREF} className="hover:text-white">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p>
            <a href={`mailto:${EMAIL}`} className="hover:text-white">
              {EMAIL}
            </a>
          </p>
        </address>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-sm sm:px-6">© 2026 HT Automotive</p>
    </footer>
  );
}

/* Duimvriendelijke actiebalk op mobiel */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={PHONE_HREF}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 font-semibold text-ink-900"
        >
          <Icon className="h-5 w-5">{icons.phone}</Icon>
          Bellen
        </a>
        <a
          href="#afspraak"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-semibold text-white"
        >
          Afspraak
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
