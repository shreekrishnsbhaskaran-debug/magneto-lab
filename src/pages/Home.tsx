import { ArrowRight, BookOpen, ChartNoAxesCombined, Magnet } from "lucide-react";
import { Link } from "react-router-dom";
import BHCurveChart from "@/components/BHCurveChart";
import { Panel } from "@/components/SiteLayout";
import { materials } from "@/data/materialData";

const Home = () => (
  <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
    <section className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
      <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-800"><Magnet size={14} /> A magnetic materials lab</p>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-tight text-[#15324d] sm:text-6xl">Understand the <span className="text-cyan-700">B–H curve.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Explore how ferromagnetic materials respond to a changing magnetic field. Hysteresis traces the material’s magnetic history—revealing saturation, remanence, and coercivity in one view.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/materials" className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800">Explore materials <ArrowRight size={16} /></Link><Link to="/simulator" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-800"><ChartNoAxesCombined size={16} /> Open simulator</Link></div>
        <div className="mt-10 flex items-center gap-3 border-t border-slate-200 pt-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-cyan-700 shadow-sm"><BookOpen size={19} /></span><p className="max-w-sm text-xs leading-5 text-slate-500">Educational reference values are illustrative starting parameters, not certified experimental data.</p></div>
      </div>
      <Panel className="overflow-hidden p-4 sm:p-6">
        <div className="mb-2 flex items-center justify-between px-1"><div><p className="text-sm font-semibold text-[#17324d]">Magnetic hysteresis</p><p className="mt-1 text-xs text-slate-500">{materials[0].name} · illustrative simulated loop</p></div><span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-800">B / H</span></div>
        <div className="rounded-xl border border-slate-100 bg-[#fbfdff] px-1 pt-1"><BHCurveChart material={materials[0]} compact /></div>
      </Panel>
    </section>
    <section className="mt-14 grid gap-4 sm:grid-cols-3">
      {[{ title: "Browse materials", text: "Seven ferromagnetic materials, with key reference properties.", to: "/materials", icon: Magnet }, { title: "Explore the curve", text: "A dedicated plot area and controls layout for B–H exploration.", to: "/simulator", icon: ChartNoAxesCombined }, { title: "Compare properties", text: "Select materials and view their magnetic parameters side by side.", to: "/comparison", icon: BookOpen }].map(({ title, text, to, icon: Icon }) => <Link key={to} to={to} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-md"><Icon size={19} className="text-cyan-700" /><h2 className="mt-4 font-semibold text-[#17324d]">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-800">Open section <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></Link>)}
    </section>
  </main>
);

export default Home;
