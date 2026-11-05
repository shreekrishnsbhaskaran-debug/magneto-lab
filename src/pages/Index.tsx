import { ArrowRight, Atom, Compass, Magnet } from "lucide-react";
import { Link } from "react-router-dom";
import { materialDataDisclaimer, materials } from "@/data/materialData";

const Index = () => (
  <div className="min-h-screen bg-[#f5f8fb] text-[#17324d]">
    <header className="border-b border-slate-200/80 bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="B-H Curve Simulator home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Magnet size={21} /></span>
          <span><span className="block text-sm font-bold tracking-tight">B–H CURVE SIMULATOR</span><span className="text-xs text-slate-500">Magnetic materials library</span></span>
        </Link>
        <span className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex"><Atom size={16} className="text-cyan-600" /> Engineering reference</span>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700"><Compass size={15} /> Materials library</p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#15324d] sm:text-5xl">Explore magnetic materials</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Compare the defining characteristics of common ferromagnetic materials. Select a material to view its reference parameters and B–H curve area.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((material, index) => (
          <Link key={material.slug} to={`/materials/${material.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_18px_-12px_rgba(15,45,73,0.25)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" style={{ animationDelay: `${index * 45}ms` }}>
            <div className="mb-6 flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf7fa] text-cyan-700"><Magnet size={20} strokeWidth={1.8} /></span>
              <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-700" />
            </div>
            <h2 className="text-xl font-semibold text-[#17324d]">{material.name}</h2>
            <p className="mt-1 text-sm font-medium text-cyan-800">{material.classification}</p>
            <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{material.description}</p>
            <div className="mt-5 flex gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span>Bs <strong className="ml-1 text-slate-700">{material.saturationFluxDensity.toFixed(1)} T</strong></span>
              <span>Hc <strong className="ml-1 text-slate-700">{material.coercivity.toLocaleString()} A/m</strong></span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-7 text-xs leading-5 text-slate-500">{materialDataDisclaimer}</p>
    </main>
  </div>
);

export default Index;