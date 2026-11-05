import { CartesianGrid, ComposedChart, Line, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Material } from "@/data/materialData";
import { generateBHCurve } from "@/lib/bhCurve";

const formatField = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const BHCurveChart = ({ material, compact = false }: { material: Material; compact?: boolean }) => {
  const curve = generateBHCurve(material);
  const hMax = Math.max(material.maxAppliedField, material.coercivity * 1.15);
  const chartData = curve.ascending.map((point, index) => ({ h: point.h, ascending: point.b, descending: curve.descending[index].b }));

  return <div className="w-full">
    <div className={`${compact ? "h-[300px] sm:h-[360px]" : "h-[390px] sm:h-[480px]"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 16, right: 26, bottom: 20, left: 8 }}>
          <CartesianGrid stroke="#e4edf3" strokeDasharray="3 5" />
          <XAxis dataKey="h" type="number" domain={[-hMax, hMax]} tickFormatter={(value: number) => formatField(value)} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Field Strength (H), A/m", position: "insideBottom", offset: -12, fill: "#405b70", fontSize: 12 }} />
          <YAxis type="number" domain={[-material.saturationFluxDensity * 1.12, material.saturationFluxDensity * 1.12]} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Flux Density (B), T", angle: -90, position: "insideLeft", fill: "#405b70", fontSize: 12 }} />
          <Tooltip cursor={{ stroke: "#91a5b4", strokeDasharray: "4 4" }} contentStyle={{ borderRadius: 12, borderColor: "#d8e4eb", boxShadow: "0 8px 24px rgba(20,52,76,.12)", fontSize: 12 }} labelFormatter={(value) => `H = ${formatField(Number(value))} A/m`} formatter={(value, name) => [`${Number(value).toFixed(3)} T`, name === "ascending" ? "Ascending B" : "Descending B"]} />
          <Line type="monotone" dataKey="ascending" name="Ascending branch" stroke="#0891b2" strokeWidth={3} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          <Line type="monotone" dataKey="descending" name="Descending branch" stroke="#3157a4" strokeWidth={3} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          {curve.markers.map((marker) => <ReferenceDot key={marker.label} x={marker.h} y={marker.b} r={6} fill={marker.color} stroke="white" strokeWidth={2} ifOverflow="visible" />)}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 px-2 pt-3 text-[11px] text-slate-600">
      <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-cyan-700" />Ascending branch</span>
      <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-blue-800" />Descending branch</span>
      <span className="flex items-center gap-2"><span className="h-2 w-2 rotate-45 bg-orange-600" />Saturation</span>
      <span className="flex items-center gap-2"><span className="h-2 w-2 rotate-45 bg-cyan-700" />Remanence</span>
      <span className="flex items-center gap-2"><span className="h-2 w-2 rotate-45 bg-violet-700" />Coercivity</span>
    </div>
    <p className="mt-3 text-[11px] leading-5 text-slate-500">Illustrative simulation generated from the material’s listed parameters; not measured experimental data.</p>
  </div>;
};

export default BHCurveChart;
