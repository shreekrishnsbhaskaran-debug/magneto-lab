import { useState } from "react";
import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { materials } from "@/data/materialData";
import { generateCompleteHysteresisLoop } from "@/engine/hysteresisModel";
import { PageContainer, PageHeading, Panel, PanelHeading } from "@/components/SiteLayout";

const curveColors = ["#0891b2", "#3157a4", "#d97738"];

const Comparison = () => {
  const [selected, setSelected] = useState<string[]>([materials[0].slug, materials[1].slug]);
  const selectedMaterials = materials.filter((material) => selected.includes(material.slug));
  const series = selectedMaterials.map((material) => ({
    material,
    points: generateCompleteHysteresisLoop(material).cycle,
  }));
  const maxField = Math.max(...selectedMaterials.map((material) => material.maxAppliedField));
  const maxSaturation = Math.max(...selectedMaterials.map((material) => material.saturationFluxDensity));

  const toggle = (slug: string) => setSelected((current) => {
    if (current.includes(slug)) return current.length > 2 ? current.filter((item) => item !== slug) : current;
    return current.length < 3 ? [...current, slug] : current;
  });

  const rows = [
    { label: "Saturation (Bs)", value: (material: typeof materials[number]) => `${material.saturationFluxDensity.toFixed(1)} T` },
    { label: "Remanence (Br)", value: (material: typeof materials[number]) => `${material.remanence.toFixed(1)} T` },
    { label: "Coercivity (Hc)", value: (material: typeof materials[number]) => `${material.coercivity.toLocaleString()} A/m` },
    { label: "Loop width (2 × Hc)", value: (material: typeof materials[number]) => `${(material.coercivity * 2).toLocaleString()} A/m` },
  ];

  return <PageContainer>
    <PageHeading eyebrow="Material comparison" title="Compare B–H curves" description="Select two or three materials to compare their illustrative hysteresis loops and magnetic properties on a shared field scale." />
    <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Panel className="h-fit p-5"><PanelHeading title="Select materials" hint="Choose 2–3 materials" />
        <div className="space-y-1">{materials.map((material) => {
          const checked = selected.includes(material.slug);
          const disabled = checked ? selected.length <= 2 : selected.length >= 3;
          return <label key={material.slug} className={`flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm ${disabled && !checked ? "cursor-not-allowed text-slate-400" : "cursor-pointer text-slate-700 hover:bg-slate-50"}`}><input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(material.slug)} className="h-4 w-4 rounded border-slate-300 accent-cyan-700 disabled:opacity-50" />{material.name}</label>;
        })}</div>
      </Panel>
      <div className="min-w-0 space-y-5">
        <Panel className="min-w-0 p-4 sm:p-6">
          <PanelHeading title="Illustrative B–H hysteresis loops" hint="Shared H and B axes · each curve is generated from its material parameters" />
          <div className="h-[350px] min-w-0 sm:h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 12, right: 20, bottom: 18, left: 4 }}>
                <CartesianGrid stroke="#e4edf3" strokeDasharray="3 5" />
                <XAxis type="number" dataKey="h" domain={[-maxField, maxField]} tickFormatter={(value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 })} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Field Strength (H), A/m", position: "insideBottom", offset: -12, fill: "#405b70", fontSize: 12 }} />
                <YAxis type="number" dataKey="b" domain={[-maxSaturation * 1.12, maxSaturation * 1.12]} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Flux Density (B), Tesla", angle: -90, position: "insideLeft", fill: "#405b70", fontSize: 12 }} />
                <Tooltip cursor={{ stroke: "#91a5b4", strokeDasharray: "4 4" }} contentStyle={{ borderRadius: 12, borderColor: "#d8e4eb", fontSize: 12 }} labelFormatter={(value) => `H = ${Number(value).toLocaleString()} A/m`} formatter={(value, name) => [`${Number(value).toFixed(3)} T`, name]} />
                {series.map(({ material, points }, index) => <Line key={material.slug} data={points} type="linear" dataKey="b" name={material.name} stroke={curveColors[index]} strokeWidth={2.8} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />)}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 px-2 pt-3 text-xs text-slate-600">{series.map(({ material }, index) => <span key={material.slug} className="flex items-center gap-2"><span className="h-0.5 w-6" style={{ backgroundColor: curveColors[index] }} />{material.name}</span>)}</div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Curves are illustrative simulations. The horizontal scale expands to include the selected materials’ maximum applied fields.</p>
        </Panel>
        <Panel className="min-w-0 overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6"><PanelHeading title="Magnetic property comparison" hint="Illustrative values from the material database" /></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[530px] text-left text-sm"><thead className="bg-slate-50/80"><tr><th className="px-5 py-3 font-medium text-slate-500 sm:px-6">Property</th>{selectedMaterials.map((material, index) => <th key={material.slug} className="px-4 py-3 font-semibold" style={{ color: curveColors[index] }}>{material.name}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.label}><th className="px-5 py-4 font-medium text-slate-600 sm:px-6">{row.label}</th>{selectedMaterials.map((material) => <td key={material.slug} className="px-4 py-4 text-slate-700">{row.value(material)}</td>)}</tr>)}</tbody></table></div>
        </Panel>
      </div>
    </div>
  </PageContainer>;
};

export default Comparison;
