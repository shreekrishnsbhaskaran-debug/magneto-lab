import { CartesianGrid, ComposedChart, Line, ReferenceDot, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";
import type { Material } from "@/data/materialData";
import { generateCompleteHysteresisLoop } from "@/engine/hysteresisModel";
import type { MagneticState } from "@/engine/hysteresisModel";

const formatField = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const BHCurveChart = ({ material, compact = false, currentState }: { material: Material; compact?: boolean; currentState?: MagneticState }) => {
  const simulation = generateCompleteHysteresisLoop(material);
  const hMax = material.maxAppliedField;
  const descendingPoints = [simulation.cycle[0], ...simulation.cycle.filter((point) => point.branch === "descending")];
  const ascendingPoints = [simulation.cycle.find((point) => point.h === -hMax)!, ...simulation.cycle.filter((point) => point.branch === "ascending")];

  return <div className="w-full">
    <div className={`${compact ? "h-[300px] sm:h-[360px]" : "h-[390px] sm:h-[480px]"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={simulation.cycle} margin={{ top: 16, right: 26, bottom: 20, left: 8 }}>
          <CartesianGrid stroke="#e4edf3" strokeDasharray="3 5" />
          <XAxis dataKey="h" type="number" domain={[-hMax, hMax]} tickFormatter={(value: number) => formatField(value)} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Field Strength (H), A/m", position: "insideBottom", offset: -12, fill: "#405b70", fontSize: 12 }} />
          <YAxis dataKey="b" type="number" domain={[-material.saturationFluxDensity * 1.12, material.saturationFluxDensity * 1.12]} tick={{ fill: "#657d90", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#8ba0af" }} label={{ value: "Magnetic Flux Density (B), T", angle: -90, position: "insideLeft", fill: "#405b70", fontSize: 12 }} />
          <Tooltip cursor={{ stroke: "#91a5b4", strokeDasharray: "4 4" }} contentStyle={{ borderRadius: 12, borderColor: "#d8e4eb", boxShadow: "0 8px 24px rgba(20,52,76,.12)", fontSize: 12 }} labelFormatter={(value) => `H = ${formatField(Number(value))} A/m`} formatter={(value, name) => [`${Number(value).toFixed(3)} T`, name === "Live magnetic state" ? "Current B" : "B"]} />
          <Line data={descendingPoints} type="linear" dataKey="b" name="Descending branch" stroke="#3157a4" strokeWidth={3} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          <Line data={ascendingPoints} type="linear" dataKey="b" name="Ascending branch" stroke="#0891b2" strokeWidth={3} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          {simulation.landmarks.map((point) => <ReferenceDot key={point.label} x={point.h} y={point.b} r={6} fill={point.color} stroke="white" strokeWidth={2} ifOverflow="visible" />)}
          {currentState && <Scatter name="Live magnetic state" data={[{ h: currentState.h, b: currentState.b }]} dataKey="b" fill="#e69a22" stroke="white" strokeWidth={2} shape="circle" isAnimationActive={false} />}
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
    <p className="mt-3 text-xs font-semibold text-slate-700">Estimated loop area: {simulation.estimatedLossJPerM3.toLocaleString(undefined, { maximumFractionDigits: 1 })} J/m³ per cycle</p>
    <p className="mt-1 text-[11px] leading-5 text-slate-500">Estimate from this illustrative model only; it is not a measured material loss value.</p>
  </div>;
};

export default BHCurveChart;
