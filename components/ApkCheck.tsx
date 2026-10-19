"use client";

/*
 * APK-kentekencheck via de open RDW-API (geen API-key nodig).
 * Het kenteken wordt nergens opgeslagen of gelogd; de request gaat rechtstreeks
 * vanuit de browser naar opendata.rdw.nl.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";

const RDW_URL = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
const EMAIL = "info@htautomotive.nl";
const SOON_DAYS = 60;

type Vehicle = {
  merk?: string;
  handelsbenaming?: string;
  vervaldatum_apk?: string; // yyyymmdd
  vervaldatum_apk_dt?: string; // ISO
};

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "invalid" }
  | { kind: "notfound"; plate: string }
  | { kind: "error" }
  | { kind: "result"; plate: string; vehicle: Vehicle };

function normalize(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

/** Zet streepjes tussen letter- en cijfergroepen, bijv. 16RSL9 -> 16-RSL-9 */
function formatPlate(plate: string) {
  if (plate.length !== 6) return plate;
  const groups = plate.match(/[A-Z]+|[0-9]+/g) ?? [];
  if (groups.length === 3) return groups.join("-");
  return `${plate.slice(0, 2)}-${plate.slice(2, 4)}-${plate.slice(4)}`;
}

function titleCase(value: string) {
  return value.toLowerCase().replace(/(^|[\s-])\S/g, (c) => c.toUpperCase());
}

function vehicleName({ merk = "", handelsbenaming = "" }: Vehicle) {
  const model = handelsbenaming.toUpperCase().startsWith(merk.toUpperCase())
    ? handelsbenaming.slice(merk.length).trim()
    : handelsbenaming;
  return titleCase([merk, model].filter(Boolean).join(" ")) || "Onbekend voertuig";
}

function expiryDate(v: Vehicle): Date | null {
  const raw = v.vervaldatum_apk ?? v.vervaldatum_apk_dt?.slice(0, 10).replace(/-/g, "");
  if (!raw || !/^\d{8}$/.test(raw)) return null;
  return new Date(Number(raw.slice(0, 4)), Number(raw.slice(4, 6)) - 1, Number(raw.slice(6, 8)));
}

function formatDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

function daysUntil(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

export default function ApkCheck() {
  const [plate, setPlate] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    if (plate.length !== 6) {
      setState({ kind: "invalid" });
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ kind: "loading" });

    try {
      const res = await fetch(`${RDW_URL}?kenteken=${plate}`, { signal: controller.signal });
      if (!res.ok) throw new Error(String(res.status));
      const data: Vehicle[] = await res.json();
      setState(data.length ? { kind: "result", plate, vehicle: data[0] } : { kind: "notfound", plate });
    } catch (err) {
      if ((err as Error).name !== "AbortError") setState({ kind: "error" });
    }
  }

  const loading = state.kind === "loading";

  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-20px_rgba(11,27,51,0.35)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">APK check</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-navy-900">Wanneer moet jouw auto de APK in?</h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <label htmlFor="kenteken" className="sr-only">
          Kenteken
        </label>
        {/* Kentekenplaat */}
        <div className="flex h-20 overflow-hidden rounded-xl border-2 border-navy-900 bg-[#f7c600] shadow-inner ring-1 ring-black/5 focus-within:ring-4 focus-within:ring-accent-400/50">
          <div className="flex w-12 shrink-0 flex-col items-center justify-between bg-[#003399] py-2.5 text-white" aria-hidden="true">
            <svg viewBox="0 0 20 20" className="h-5 w-5">
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return <circle key={i} cx={10 + Math.cos(a) * 7} cy={10 + Math.sin(a) * 7} r="1.1" fill="#ffcc00" />;
              })}
            </svg>
            <span className="text-sm font-bold">NL</span>
          </div>
          <input
            id="kenteken"
            name="kenteken"
            value={formatPlate(plate)}
            onChange={(e) => {
              setPlate(normalize(e.target.value));
              if (state.kind === "invalid") setState({ kind: "idle" });
            }}
            placeholder="16-RSL-9"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={8}
            aria-describedby="kenteken-hint"
            aria-invalid={state.kind === "invalid"}
            className="w-full min-w-0 bg-transparent px-3 text-center font-mono text-[2rem] font-black uppercase tracking-[0.12em] text-black placeholder:text-black/25 focus:outline-none sm:text-[2.4rem]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 font-semibold text-white transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-80"
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />}
          {loading ? "Bezig met controleren…" : "Check mijn APK"}
        </button>
      </form>

      <div aria-live="polite" className="empty:hidden mt-5">
        {state.kind === "loading" && (
          <div className="space-y-3 rounded-2xl bg-slate-100/80 p-5" aria-label="Laden">
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          </div>
        )}
        {state.kind === "invalid" && (
          <Message tone="red">Vul een geldig kenteken in van 6 letters en cijfers, bijvoorbeeld 16-RSL-9.</Message>
        )}
        {state.kind === "notfound" && (
          <Message tone="neutral">
            Kenteken {formatPlate(state.plate)} is niet gevonden bij de RDW. Controleer het kenteken en probeer het opnieuw.
          </Message>
        )}
        {state.kind === "error" && (
          <Message tone="red">De RDW is op dit moment niet bereikbaar. Probeer het later opnieuw of bel ons even.</Message>
        )}
        {state.kind === "result" && <Result plate={state.plate} vehicle={state.vehicle} />}
      </div>

      <p id="kenteken-hint" className="mt-5 flex items-center gap-2 text-xs text-slate-500">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        We slaan je kenteken niet op. Gegevens komen van de RDW.
      </p>
    </div>
  );
}

function Message({ tone, children }: { tone: "red" | "neutral"; children: React.ReactNode }) {
  const styles = tone === "red" ? "bg-red-50 text-red-800" : "bg-slate-100 text-slate-700";
  return <p className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${styles}`}>{children}</p>;
}

function Result({ plate, vehicle }: { plate: string; vehicle: Vehicle }) {
  const expiry = expiryDate(vehicle);
  const days = expiry ? daysUntil(expiry) : null;

  let chip: { label: string; className: string };
  if (!expiry || days === null) {
    chip = { label: "Geen APK-vervaldatum bekend", className: "bg-slate-100 text-slate-700" };
  } else if (days < 0) {
    chip = { label: "Je APK is verlopen", className: "bg-red-100 text-red-800" };
  } else if (days <= SOON_DAYS) {
    chip = { label: "Je APK verloopt binnenkort", className: "bg-amber-100 text-amber-900" };
  } else {
    chip = { label: `APK geldig tot ${formatDate(expiry)}`, className: "bg-emerald-100 text-emerald-800" };
  }

  const subject = encodeURIComponent("APK afspraak aanvragen");
  const body = encodeURIComponent(`Hallo HT Automotive,\n\nIk wil graag een APK-afspraak maken voor kenteken ${formatPlate(plate)}.\n\nMet vriendelijke groet,\n`);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-lg font-bold text-navy-900">{vehicleName(vehicle)}</p>
      <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
        <div className="flex gap-1.5">
          <dt>Kenteken:</dt>
          <dd className="font-mono font-semibold text-navy-900">{formatPlate(plate)}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Vervaldatum APK:</dt>
          <dd className="font-semibold text-navy-900">{expiry ? formatDate(expiry) : "onbekend"}</dd>
        </div>
      </dl>
      <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${chip.className}`}>
        <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        {chip.label}
      </p>
      {!expiry && (
        <p className="mt-3 text-sm text-slate-600">
          Mogelijk is er nog geen APK-plicht voor dit voertuig, of is de datum niet beschikbaar in de open data.
        </p>
      )}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href="#afspraak"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-500 px-5 font-semibold text-white transition hover:bg-accent-600"
        >
          Plan je APK bij ons
        </a>
        <a
          href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 px-5 font-semibold text-navy-900 transition hover:border-accent-500 hover:text-accent-700"
        >
          Mail ons
        </a>
      </div>
    </div>
  );
}
