import { ArrowRight, Magnet } from "lucide-react";
import { Link } from "react-router-dom";
import { materialDataDisclaimer, materials } from "@/data/materialData";
import { PageContainer, PageHeading } from "@/components/SiteLayout";

const Materials = () => (
  <PageContainer>
    <PageHeading eyebrow="Material library" title="Explore magnetic materials" description="Select a material to review its magnetic characteristics, illustrative B–H curve area, and reference properties." />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {materials.map((material) => <Link key={material.slug} to={`/materials/${material.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_18px_-12px_rgba(15,45,73,0.25)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
        <div className="mb-6 flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf7fa] text-cyan-700"><Magnet size={20} /></span><ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-700" /></div>
        <h2 className="text-xl font-semibold text-[#17324d]">{material.name}</h2><p className="mt-1 text-sm font-medium text-cyan-800">{material.classification}</p><p className="mt-4 min-h-10 text-sm leading-5 text-slate-600">{material.description}</p>
        <div className="mt-5 flex gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500"><span>Bs <strong className="ml-1 text-slate-700">{material.saturationFluxDensity.toFixed(1)} T</strong></span><span>Hc <strong className="ml-1 text-slate-700">{material.coercivity.toLocaleString()} A/m</strong></span></div>
      </Link>)}
    </div>
    <p className="mt-7 text-xs leading-5 text-slate-500">{materialDataDisclaimer}</p>
  </PageContainer>
);

export default Materials;
