import { ArrowLeft, Magnet } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { materialDataDisclaimer, materials } from "@/data/materialData";

const MaterialDetail = () => {
  const { slug } = useParams();
  const material = materials.find((item) => item.slug === slug);

  if (!material) {
    return <main className="grid min-h-screen place-items-center bg-[#f5f8fb] px-6 text-center"><div><h1 className="text-2xl font-semibold text-[#17324d]">Material not found</h1><Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700"><ArrowLeft size={16} /> Back to materials</Link></div></main>;
  }

  const properties = [
    { label: "Saturation flux density (Bs)", value: `${material.saturationFluxDensity.toFixed(1)} T` },
    { label: "Remanence (Br)", value: `${material.remanence.toFixed(1)} T` },
    { label: "Coercivity (Hc)", value: `${material.coercivity.toLocaleString()} A/m` },
    { label: "Magnetic permeability", value: "Unavailable" },
    { label: "Hysteresis loss", value: "Unavailable" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8fb] text-[#17324d]">
      <header className="border-b border-slate-200/80 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Magnet size={21} /></span><span className="text-sm font-bold tracking-tight">B–H CURVE SIMULATOR</span></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-cyan-700"><ArrowLeft size={16} /> All materials</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{material.classification}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#15324d] sm:text-5xl">{material.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{material.description}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold text-[#17324d]">B–H curve</h2><p className="mt-1 text-xs text-slate-500">Illustrative curve area · no simulation applied</p></div><span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">B (T) / H (A/m)</span></div>
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#fbfdff] p-3 sm:p-5">
              <svg viewBox="0 0 600 340" role="img" aria-label={`Illustrative B-H hysteresis curve for ${material.name}`} className="h-auto w-full">
                <defs><pattern id="grid" width="40" height="34" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 34" fill="none" stroke="#e6eef4" strokeWidth="1" /></pattern></defs>
                <rect x="52" y="18" width="510" height="270" fill="url(#grid)" />
                <line x1="52" y1="288" x2="562" y2="288" stroke="#7890a3" strokeWidth="1.5" /><line x1="307" y1="18" x2="307" y2="288" stroke="#7890a3" strokeWidth="1.5" />
                <path d="M 70 260 C 113 258, 118 239, 129 190 C 142 130, 166 74, 230 54 C 290 36, 380 39, 478 40 C 487 76, 485 115, 470 145 C 450 188, 405 210, 346 221 C 270 235, 177 236, 120 237 C 110 205, 112 169, 129 140 C 153 97, 204 77, 267 68 C 350 56, 439 61, 535 64" fill="none" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <text x="552" y="311" fill="#526a7d" fontSize="13">H</text><text x="297" y="17" fill="#526a7d" fontSize="13">B</text><text x="30" y="34" fill="#74899a" fontSize="11">+Bs</text><text x="30" y="286" fill="#74899a" fontSize="11">−Bs</text>
              </svg>
            </div>
          </section>
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-[#17324d]">Magnetic characteristics</h2>
              <ul className="mt-4 space-y-3">{material.characteristics.map((characteristic) => <li key={characteristic} className="flex gap-3 text-sm leading-5 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />{characteristic}</li>)}</ul>
              <div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Low-field response</p><p className="mt-1 text-sm text-slate-700">{material.lowFieldResponseLabel}</p></div>
            </section>
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4"><h2 className="font-semibold text-[#17324d]">Magnetic properties</h2></div>
              <dl className="divide-y divide-slate-100 px-6">{properties.map((property) => <div key={property.label} className="flex items-center justify-between gap-4 py-3.5"><dt className="text-sm text-slate-600">{property.label}</dt><dd className={`text-right text-sm font-semibold ${property.value === "Unavailable" ? "font-normal text-slate-400" : "text-[#17324d]"}`}>{property.value}</dd></div>)}</dl>
            </section>
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-slate-500">{materialDataDisclaimer} Permeability and hysteresis-loss values are not available here.</p>
      </main>
    </div>
  );
};

export default MaterialDetail;
