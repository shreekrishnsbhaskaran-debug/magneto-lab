import { useState } from "react";
import { Info } from "lucide-react";
import { materials } from "@/data/materialData";
import { PageContainer, PageHeading, Panel, PanelHeading } from "@/components/SiteLayout";

const Comparison = () => {
  const [selected, setSelected] = useState<string[]>([materials[0].slug, materials[1].slug]);
  const selectedMaterials = materials.filter((material) => selected.includes(material.slug));
  const toggle = (slug: string) => setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  const rows = [
    { label: "Classification", value: (material: typeof materials[number]) => material.classification },
    { label: "Saturation flux density (Bs)", value: (material: typeof materials[number]) => `${material.saturationFluxDensity.toFixed(1)} T` },
    { label: "Remanence (Br)", value: (material: typeof materials[number]) => `${material.remanence.toFixed(1)} T` },
    { label: "Coercivity (Hc)", value: (material: typeof materials[number]) => `${material.coercivity.toLocaleString()} A/m` },
    { label: "Magnetic permeability", value: () => "Unavailable" },
    { label: "Hysteresis loss", value: () => "Unavailable" },
  ];

  return <PageContainer>
    <PageHeading eyebrow="Material comparison" title="Compare magnetic properties" description="Choose materials to view their illustrative reference parameters side by side. Selections are kept for this session only." />
    <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
      <Panel className="h-fit p-5"><PanelHeading title="Select materials" hint="Choose one or more materials" />
        <div className="space-y-1">{materials.map((material) => <label key={material.slug} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"><input type="checkbox" checked={selected.includes(material.slug)} onChange={() => toggle(material.slug)} className="h-4 w-4 rounded border-slate-300 accent-cyan-700" />{material.name}</label>)}</div>
      </Panel>
      <Panel className="min-w-0 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6"><PanelHeading title="Property comparison" hint="Illustrative starting parameters; not certified experimental values" /></div>
        {selectedMaterials.length ? <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-slate-50/80"><tr><th className="px-5 py-3 font-medium text-slate-500 sm:px-6">Property</th>{selectedMaterials.map((material) => <th key={material.slug} className="px-4 py-3 font-semibold text-[#17324d]">{material.name}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.label}><th className="px-5 py-4 font-medium text-slate-600 sm:px-6">{row.label}</th>{selectedMaterials.map((material) => <td key={material.slug} className="px-4 py-4 text-slate-700">{row.value(material)}</td>)}</tr>)}</tbody></table></div> : <div className="p-10 text-center text-sm text-slate-500">Select a material to populate the comparison.</div>}
        <div className="mx-5 mb-5 flex gap-2 rounded-xl bg-cyan-50 p-3 text-xs leading-5 text-cyan-900 sm:mx-6"><Info size={16} className="mt-0.5 shrink-0" />Permeability and hysteresis-loss data are unavailable.</div>
      </Panel>
    </div>
  </PageContainer>;
};

export default Comparison;
