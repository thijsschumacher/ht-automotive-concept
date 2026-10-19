/*
 * HT Automotive – conceptwebsite (salesconcept Forever in Business)
 *
 * FOTO'S: dit concept gebruikt bewust geen foto's, alles is CSS en inline SVG.
 * Echte werkplaatsfoto's kunnen later op deze plekken worden ingevuld
 * (zet ze in /public en gebruik next/image):
 *   1. Hero            -> nu een stockfoto van Unsplash (HERO_PHOTO); vervang door een eigen werkplaatsfoto in /public
 *   2. Dienstkaarten   -> optioneel een foto per dienst boven het icoon (<Services />)
 *   3. Over ons        -> vervang de initialen-cirkels door portretten van Bilal en Najim (<About />)
 *   4. Afspraak        -> eventueel een foto van de wachtruimte naast de contactopties (<Appointment />)
 */

import type { ReactNode } from "react";
import Image from "next/image";
import ApkCheck from "@/components/ApkCheck";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";

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

// Stockfoto: "Mechanic working on a car engine in a workshop" door Dextar Studio (Unsplash License)
// https://unsplash.com/photos/mechanic-working-on-a-car-engine-in-a-workshop-XP8o9_Arwqg
// TODO: vervangen door een eigen foto van de werkplaats, bijv. "/werkplaats.jpg" in /public
const HERO_PHOTO = "https://images.unsplash.com/photo-1771340012319-0b4fca008b54";

const KEURMERKEN = ["RDW erkend", "NAP", "Bosch", "Airco Service Station", "Kroon-Oil", "Pinnen ja graag"];

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
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

/* Duotone dienst-iconen (40x40) */
function ServiceIcon({ type }: { type: "apk" | "repair" | "season" }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "apk" && (
        <>
          <rect x="9" y="7" width="22" height="28" rx="4" fill="currentColor" opacity="0.18" />
          <rect x="9" y="7" width="22" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
          <rect x="15" y="4" width="10" height="6" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
          <path d="M14.5 21.5l4 4 7-8" stroke="currentColor" strokeWidth="2.4" />
        </>
      )}
      {type === "repair" && (
        <>
          <circle cx="25" cy="15" r="9" fill="currentColor" opacity="0.18" />
          <path
            d="M24.5 9.5a1.2 1.2 0 0 0 0 1.7l2.2 2.2a1.2 1.2 0 0 0 1.7 0l4.4-4.4a8 8 0 0 1-10.6 10.6l-9.3 9.3a2.9 2.9 0 0 1-4-4l9.3-9.3A8 8 0 0 1 28.8 5z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
      {type === "season" && (
        <>
          <circle cx="16" cy="28" r="7" fill="currentColor" opacity="0.18" />
          <path d="M19 23.5V9a3 3 0 0 0-6 0v14.5a6 6 0 1 0 6 0z" stroke="currentColor" strokeWidth="2" />
          <path d="M16 15v13" stroke="currentColor" strokeWidth="2.4" />
          <path d="M29 6v10M24.7 8.5l8.6 5M24.7 13.5l8.6-5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="29" cy="28" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M29 21.5v1.5M29 33v1.5M22.5 28H24M34 28h1.5" stroke="currentColor" strokeWidth="1.8" />
        </>
      )}
    </svg>
  );
}

/* ---------- Secties ---------- */

function Hero() {
  const trust = [
    { icon: icons.shield, label: "RDW erkend" },
    { icon: icons.car, label: "Alle merken" },
    { icon: icons.coffee, label: "Gratis koffie" },
  ];
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#f5f9fc]">
      {/* Werkplaatsfoto, bewust vervaagd zodat de tekst leidend blijft */}
      <Image
        src={HERO_PHOTO}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 -scale-x-100 object-cover object-center opacity-60 saturate-[0.85]"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-[#f5f9fc]/95 via-[#f5f9fc]/75 to-[#f5f9fc]/25 max-lg:bg-gradient-to-b max-lg:via-[#f5f9fc]/85 max-lg:to-[#f5f9fc]/70"
        aria-hidden="true"
      />
      <div className="hero-mesh pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:min-h-[85vh] lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-navy-800 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Erkend RDW APK-keuringsstation in Naaldwijk
          </p>
          <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-navy-900 sm:text-6xl lg:text-[4.25rem]">
            APK en onderhoud in <span className="text-accent-500">Naaldwijk</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            APK, onderhoud en reparatie aan alle merken auto&apos;s en lichte bedrijfswagens. Breng uw auto gerust
            vooraf en wacht met een gratis kopje koffie of thee.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#afspraak"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-navy-900 px-7 text-base font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:bg-accent-600"
            >
              Maak een afspraak
              <Icon className="h-5 w-5">{icons.arrow}</Icon>
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white/70 px-7 text-base font-semibold text-navy-900 backdrop-blur transition hover:border-accent-500 hover:text-accent-700"
            >
              <Icon className="h-5 w-5">{icons.phone}</Icon>
              Bel direct {PHONE_DISPLAY}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-navy-900/10 pt-7">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-900">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500/15 text-accent-700">
                  <Icon className="h-4 w-4">{t.icon}</Icon>
                </span>
                {t.label}
              </li>
            ))}
          </ul>
        </div>
        <div id="apk-check" className="relative mx-auto w-full max-w-xl lg:max-w-none lg:pl-4">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-accent-400/30 to-navy-700/20 blur-3xl" aria-hidden="true" />
          <div className="animate-float focus-within:[animation-play-state:paused]">
            <ApkCheck />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div data-reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-navy-900 sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">{intro}</p>}
    </div>
  );
}

function Services() {
  const services = [
    {
      icon: "apk" as const,
      title: "APK keuringen",
      text: "Wij zijn een erkend RDW APK-keuringsstation in Naaldwijk, Westland. Uw APK wordt vakkundig en zorgvuldig uitgevoerd, zodat u weer met een gerust gevoel de weg op gaat.",
    },
    {
      icon: "repair" as const,
      title: "Onderhoud & reparatie",
      text: "Voor alle merken auto's en lichte bedrijfswagens. Van olie verversen tot regulier onderhoud en reparaties: wij houden uw voertuig in topconditie.",
    },
    {
      icon: "season" as const,
      title: "Zomer- & wintercheck",
      text: "Met onze seizoenscheck gaat uw auto of lichte bedrijfswagen veilig de zomer of winter in. Wij controleren de belangrijkste punten, zodat u niet voor verrassingen komt te staan.",
    },
  ];
  return (
    <section id="diensten" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Diensten"
          title="Alles voor uw auto onder één dak"
          intro="APK, onderhoud en reparatie aan alle merken auto's en lichte bedrijfswagens."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="group flex flex-col rounded-3xl border border-slate-200/80 bg-slate-50/60 p-8 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(11,27,51,0.25)] sm:p-10"
            >
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent-100 to-accent-50 text-accent-700 ring-1 ring-accent-500/15 transition group-hover:from-accent-500 group-hover:to-accent-400 group-hover:text-white">
                <ServiceIcon type={s.icon} />
              </span>
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-navy-900">{s.title}</h3>
              <p className="mt-4 flex-1 text-[17px] leading-relaxed text-slate-600">{s.text}</p>
              <a
                href="#afspraak"
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-accent-700 transition hover:text-navy-900"
              >
                Meer info
                <Icon className="h-4 w-4 transition-transform group-hover:translate-x-1">{icons.arrow}</Icon>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const founders = [
    { name: "Bilal Tahayekt", initials: "BT" },
    { name: "Najim el Haddioui", initials: "NH" },
  ];
  const perks = [
    { icon: icons.key, title: "Auto vooraf brengen", text: "Breng uw auto gerust van tevoren, dan staat hij klaar voor de afspraak." },
    { icon: icons.briefcase, title: "Flexibel voor bedrijven", text: "Flexibele openingstijden voor bedrijven met lichte bedrijfswagens." },
    { icon: icons.coffee, title: "Koffie of thee", text: "Wacht u tijdens de APK of reparatie? De koffie of thee staat klaar." },
  ];
  return (
    <section id="over-ons" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Over ons"
            title="Jong, persoonlijk en vakkundig"
            intro="HT Automotive is opgericht door Bilal Tahayekt en Najim el Haddioui. Als jong bedrijf verzorgen wij onderhoud, autoreparaties en APK aan alle merken auto's en lichte bedrijfswagens. Bij ons bent u geen nummer: we nemen de tijd, leggen uit wat we doen en denken met u mee."
          />
          <div data-reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            {founders.map((f) => (
              <div key={f.name} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                {/* Placeholder: vervang door een portretfoto */}
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-navy-900 text-lg font-bold text-accent-300"
                  aria-hidden="true"
                >
                  {f.initials}
                </span>
                <div>
                  <p className="font-semibold text-navy-900">{f.name}</p>
                  <p className="text-sm text-slate-500">Oprichter</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul className="space-y-4 self-center">
          {perks.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="flex gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-500/15">
                <Icon className="h-6 w-6">{p.icon}</Icon>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
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
    <section id="afspraak" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-14 text-white shadow-2xl sm:px-14 sm:py-20"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/30 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent-700/25 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">Afspraak maken</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              Plan uw APK, onderhoud of reparatie
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300 sm:text-xl">
              Kies wat u het makkelijkst vindt. We reageren snel en plannen een moment dat u uitkomt.
            </p>
          </div>
          <div className="relative mt-12 grid gap-4 md:grid-cols-3">
            {options.map((o) => (
              <a
                key={o.title}
                href={o.href}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:border-accent-400/50 hover:bg-white/[0.1]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500 text-white">
                  <Icon className="h-6 w-6">{o.icon}</Icon>
                </span>
                <span className="mt-6 text-xl font-semibold">{o.title}</span>
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

function Contact() {
  return (
    <section id="contact" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Kom gerust langs" />
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div data-reveal className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10 lg:col-span-3">
            <address className="grid gap-8 not-italic sm:grid-cols-2">
              <div className="flex gap-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent-600">{icons.pin}</Icon>
                <div className="leading-relaxed">
                  <p className="font-semibold text-navy-900">HT Automotive</p>
                  <p className="text-slate-600">{ADDRESS_LINE_1}</p>
                  <p className="text-slate-600">{ADDRESS_LINE_2}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent-600">{icons.clock}</Icon>
                <div>
                  <p className="font-semibold text-navy-900">Openingstijden</p>
                  {OPENING_HOURS.length > 0 ? (
                    <dl className="mt-1 grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-slate-600">
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
              </div>
              <a href={PHONE_HREF} className="flex min-h-11 items-center gap-4 text-slate-700 transition hover:text-accent-700">
                <Icon className="h-6 w-6 shrink-0 text-accent-600">{icons.phone}</Icon>
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-4 break-all text-slate-700 transition hover:text-accent-700">
                <Icon className="h-6 w-6 shrink-0 text-accent-600">{icons.mail}</Icon>
                {EMAIL}
              </a>
            </address>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 font-semibold text-white transition hover:bg-accent-600 sm:w-auto"
            >
              Bekijk op Google Maps
              <Icon className="h-4 w-4">{icons.arrow}</Icon>
            </a>
          </div>
          <div data-reveal style={{ transitionDelay: "90ms" }} className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10 lg:col-span-2">
            <h3 className="text-lg font-semibold text-navy-900">Keurmerken en partners</h3>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {KEURMERKEN.map((k) => (
                <li
                  key={k}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700"
                >
                  <Icon className="h-4 w-4 text-accent-600">{icons.check}</Icon>
                  {k}
                </li>
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
    <footer className="bg-navy-950 pb-28 pt-20 text-slate-400 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo variant="dark" className="h-11 w-auto" />
          <p className="mt-5 max-w-xs leading-relaxed">
            APK, onderhoud en reparatie aan alle merken auto&apos;s en lichte bedrijfswagens.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Contact</h2>
          <address className="mt-5 space-y-2 not-italic">
            <p>{ADDRESS_LINE_1}</p>
            <p>{ADDRESS_LINE_2}</p>
            <p>
              <a href={PHONE_HREF} className="transition hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="transition hover:text-white">
                {EMAIL}
              </a>
            </p>
          </address>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Keurmerken</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {KEURMERKEN.map((k) => (
              <li key={k} className="rounded-full border border-white/10 px-3 py-1.5 text-sm">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-7xl border-t border-white/10 px-4 pt-8 text-sm sm:px-6 lg:px-8">© 2026 HT Automotive</p>
    </footer>
  );
}

/* Duimvriendelijke actiebalk op mobiel */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={PHONE_HREF}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white font-semibold text-navy-900"
        >
          <Icon className="h-5 w-5">{icons.phone}</Icon>
          Bellen
        </a>
        <a href="#afspraak" className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-900 font-semibold text-white">
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
      <Header phoneHref={PHONE_HREF} />
      <main>
        <Hero />
        <Services />
        <About />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <Reveal />
    </>
  );
}
