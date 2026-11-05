import { Info } from "lucide-react";
import BHCurveChart from "@/components/BHCurveChart";
import { PageContainer, PageHeading, Panel, PanelHeading } from "@/components/SiteLayout";
import { materials } from "@/data/materialData";

const Simulator = () => (
  <PageContainer>
    <PageHeading eyebrow="B–H simulator" title="Curve workspace" description="A dedicated workspace for exploring magnetic hysteresis. This stage provides the graph and controls layout; mathematical simulation is not enabled." />
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
      <Panel className="min-w-0 p-4 sm:p-6"><PanelHeading title="B–H curve" hint={`${materials[0].name} · illustrative simulation from material parameters`} /><div className="rounded-xl border border-slate-100 bg-[#fbfdff] p-2 sm:p-4"><BHCurveChart material={materials[0]} /></div></Panel>
      <Panel className="h-fit p-5 sm:p-6"><PanelHeading title="Curve controls" hint="Layout preview · controls not active" />
        <label className="mb-5 block text-sm font-medium text-slate-700">Material<select disabled className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500" defaultValue={materials[0].slug}>{materials.map((material) => <option key={material.slug} value={material.slug}>{material.name}</option>)}</select></label>
        <label className="mb-5 block text-sm font-medium text-slate-700">Maximum applied field Hmax <span className="mt-2 flex items-center gap-2"><input type="range" min="0" max="100" defaultValue="65" disabled className="w-full accent-cyan-700" /><span className="text-xs text-slate-500">A/m</span></span></label>
        <label className="mb-5 block text-sm font-medium text-slate-700">Field step <select disabled className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"><option>Not available</option></select></label>
        <div className="flex gap-2 rounded-xl bg-cyan-50 p-3 text-xs leading-5 text-cyan-900"><Info size={16} className="mt-0.5 shrink-0" />Controls are visual placeholders only. No magnetic response is calculated.</div>
      </Panel>
    </div>
  </PageContainer>
);

export default Simulator;
