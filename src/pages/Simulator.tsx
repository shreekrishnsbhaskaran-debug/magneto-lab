import { useState } from "react";
import BHCurveChart from "@/components/BHCurveChart";
import { PageContainer, PageHeading, Panel, PanelHeading } from "@/components/SiteLayout";
import { materials } from "@/data/materialData";
import { hysteresisModelAssumptions } from "@/engine/hysteresisModel";

const Simulator = () => {
  const [selectedSlug, setSelectedSlug] = useState(materials[0].slug);
  const material = materials.find((item) => item.slug === selectedSlug) ?? materials[0];

  return (
    <PageContainer>
      <PageHeading eyebrow="B–H simulator" title="Curve workspace" description="Generate a complete, history-dependent hysteresis cycle from the selected material’s illustrative parameters. The simplified phenomenological model is educational, not a certified material characterization." />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
        <Panel className="min-w-0 p-4 sm:p-6"><PanelHeading title="B–H hysteresis loop" hint={`${material.name} · calculated ascending and descending cycle`} /><div className="rounded-xl border border-slate-100 bg-[#fbfdff] p-2 sm:p-4"><BHCurveChart material={material} /></div></Panel>
        <Panel className="h-fit p-5 sm:p-6"><PanelHeading title="Material parameters" hint="Illustrative starting dataset" />
          <label className="mb-5 block text-sm font-medium text-slate-700">Material<select value={material.slug} onChange={(event) => setSelectedSlug(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">{materials.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
          <dl className="divide-y divide-slate-100 rounded-xl border border-slate-100 px-3"><div className="flex justify-between gap-3 py-3 text-sm"><dt className="text-slate-600">Saturation flux density</dt><dd className="font-medium text-slate-800">{material.saturationFluxDensity} T</dd></div><div className="flex justify-between gap-3 py-3 text-sm"><dt className="text-slate-600">Remanence</dt><dd className="font-medium text-slate-800">{material.remanence} T</dd></div><div className="flex justify-between gap-3 py-3 text-sm"><dt className="text-slate-600">Coercivity</dt><dd className="font-medium text-slate-800">{material.coercivity.toLocaleString()} A/m</dd></div><div className="flex justify-between gap-3 py-3 text-sm"><dt className="text-slate-600">Maximum applied field</dt><dd className="font-medium text-slate-800">{material.maxAppliedField.toLocaleString()} A/m</dd></div></dl>
          <div className="mt-5 rounded-xl bg-cyan-50 p-3 text-xs leading-5 text-cyan-950"><p className="font-semibold">Illustrative model assumptions</p><ul className="mt-2 list-disc space-y-1 pl-4">{hysteresisModelAssumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul></div>
        </Panel>
      </div>
    </PageContainer>
  );
};

export default Simulator;
