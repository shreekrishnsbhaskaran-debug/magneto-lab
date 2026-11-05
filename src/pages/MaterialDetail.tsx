import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { materialDataDisclaimer, materials } from "@/data/materialData";
import { PageContainer, Panel, PanelHeading } from "@/components/SiteLayout";
import BHCurveChart from "@/components/BHCurveChart";

const MaterialDetail = () => {
  const { slug } = useParams();
  const material = materials.find((item) => item.slug === slug);
  if (!material) return <PageContainer><h1 className="text-2xl font-semibold">Material not found</h1><Link to="/materials" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700"><ArrowLeft size={16} /> Back to materials</Link></PageContainer>;

  const properties = [
    { label: "Saturation flux density (Bs)", value: `${material.saturationFluxDensity.toFixed(1)} T` },
    { label: "Remanence (Br)", value: `${material.remanence.toFixed(1)} T` },
    { label: "Coercivity (Hc)", value: `${material.coercivity.toLocaleString()} A/m` },
    { label: "Magnetic permeability", value: "Unavailable" },
    { label: "Hysteresis loss", value: "Unavailable" },
  ];

  return <PageContainer>
    <Link to="/materials" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-cyan-700"><ArrowLeft size={16} /> All materials</Link>
    <div className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{material.classification}</p><h1 className="text-4xl font-semibold tracking-tight text-[#15324d] sm:text-5xl">{material.name}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{material.description}</p></div>
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <Panel className="min-w-0 p-5 sm:p-7"><PanelHeading title="B–H curve" hint={`${material.name} · ascending and descending branches`} /><BHCurveChart material={material} /></Panel>
      <div className="space-y-5">
        <Panel className="p-6"><PanelHeading title="Magnetic characteristics" /><ul className="space-y-3">{material.characteristics.map((characteristic) => <li key={characteristic} className="flex gap-3 text-sm leading-5 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />{characteristic}</li>)}</ul><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Low-field response</p><p className="mt-1 text-sm text-slate-700">{material.lowFieldResponseLabel}</p></div></Panel>
        <Panel className="overflow-hidden"><div className="border-b border-slate-100 px-6 py-4"><PanelHeading title="Magnetic properties" /></div><dl className="divide-y divide-slate-100 px-6">{properties.map((property) => <div key={property.label} className="flex items-center justify-between gap-4 py-3.5"><dt className="text-sm text-slate-600">{property.label}</dt><dd className={`text-right text-sm ${property.value === "Unavailable" ? "text-slate-400" : "font-semibold text-[#17324d]"}`}>{property.value}</dd></div>)}</dl></Panel>
      </div>
    </div>
    <p className="mt-6 text-xs leading-5 text-slate-500">{materialDataDisclaimer} Permeability and hysteresis-loss values are not available here.</p>
  </PageContainer>;
};

export default MaterialDetail;
