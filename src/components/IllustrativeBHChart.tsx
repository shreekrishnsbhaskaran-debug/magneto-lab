import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const curve = [
  { h: -6, b: -0.92 }, { h: -4, b: -0.87 }, { h: -2.4, b: -0.62 }, { h: -1.4, b: -0.18 }, { h: -0.35, b: 0.12 }, { h: 0.9, b: 0.53 }, { h: 2.8, b: 0.82 }, { h: 6, b: 0.92 },
  { h: 5.6, b: 0.84 }, { h: 3.6, b: 0.74 }, { h: 1.9, b: 0.49 }, { h: 0.8, b: 0.16 }, { h: -0.7, b: -0.14 }, { h: -2.5, b: -0.59 }, { h: -4.3, b: -0.82 }, { h: -6, b: -0.92 },
];

const IllustrativeBHChart = ({ compact = false }: { compact?: boolean }) => (
  <div className={`w-full ${compact ? "h-64 sm:h-80" : "h-[340px] sm:h-[430px]"}`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={curve} margin={{ top: 18, right: 20, bottom: 14, left: 4 }}>
        <CartesianGrid stroke="#e8eef3" strokeDasharray="3 5" />
        <ReferenceLine x={0} stroke="#8095a5" strokeWidth={1.2} />
        <ReferenceLine y={0} stroke="#8095a5" strokeWidth={1.2} />
        <XAxis dataKey="h" type="number" domain={[-6, 6]} tick={{ fill: "#708397", fontSize: 11 }} tickLine={false} axisLine={false} label={{ value: "Applied field H (schematic)", position: "insideBottom", offset: -7, fill: "#526a7d", fontSize: 12 }} />
        <YAxis type="number" domain={[-1.1, 1.1]} tick={{ fill: "#708397", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} label={{ value: "Flux density B", angle: -90, position: "insideLeft", fill: "#526a7d", fontSize: 12 }} />
        <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#dce6ed", fontSize: 12 }} labelFormatter={(value) => `H: ${value}`} formatter={(value) => [value, "B (schematic)"]} />
        <Line type="monotone" dataKey="b" stroke="#0891b2" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#0e7490" }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default IllustrativeBHChart;
