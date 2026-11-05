import { useState } from "react";
import { Minus, Plus, RotateCcw, Info } from "lucide-react";
import BHCurveChart from "@/components/BHCurveChart";
import { PageContainer, PageHeading, Panel, PanelHeading } from "@/components/SiteLayout";
import { materials } from "@/data/materialData";
import { advanceMagneticStateToField, describeMagneticState, hysteresisModelAssumptions, initialiseMagneticState } from "@/engine/hysteresisModel";

const Simulator = () => {
  const [selectedSlug, setSelectedSlug] = useState(materials[0].slug);
  const [magneticState, setMagneticState] = useState(initialiseMagneticState);
  const material = materials.find((item) => item.slug === selectedSlug) ?? materials[0];
  const fieldLimit = material.maxAppliedField;
  const sliderStep = fieldLimit / 500;
  const fieldIncrement = fieldLimit / 20;
  const updateField = (target: number) => setMagneticState((previous) => advanceMagneticStateToField(previous, target, material));
  const reset = () => setMagneticState(initialiseMagneticState());

  return (
    <PageContainer>
      <PageHeading eyebrow="B–H simulator" title="Curve workspace" description="Apply a changing magnetic field and follow the material’s history-dependent response. Moving the field incrementally updates the selected material’s magnetic state." />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_310px]">
        <Panel className="min-w-0 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <PanelHeading title="B–H hysteresis loop" hint={`${material.name} · live magnetic state shown on the complete loop`} />
            <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-900">{describeMagneticState(magneticState, material)}</span>
          </div>
          <div className="rounded-xl border border-slate-100 bg-[#fbfdff] p-2 sm:p-4"><BHCurveChart material={material} currentState={magneticState} /></div>
        </Panel>
        <div className="space-y-5">
          <Panel className="p-5 sm:p-6">
            <PanelHeading title="Simulation controls" hint="Field changes preserve magnetic history" />
            <label className="mb-5 block text-sm font-medium text-slate-700">Material
              <select value={material.slug} onChange={(event) => { setSelectedSlug(event.target.value); setMagneticState(initialiseMagneticState()); }} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                {materials.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </label>
            <label htmlFor="magnetic-field-slider" className="mb-2 block text-sm font-semibold text-slate-700">Magnetic field strength H</label>
            <input id="magnetic-field-slider" type="range" min={-fieldLimit} max={fieldLimit} step={sliderStep} value={magneticState.h} onChange={(event) => updateField(Number(event.target.value))} className="w-full cursor-pointer accent-cyan-700" aria-valuetext={`${magneticState.h.toLocaleString()} amperes per meter`} />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500"><span>−{fieldLimit.toLocaleString()} A/m</span><span>0</span><span>+{fieldLimit.toLocaleString()} A/m</span></div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => updateField(Math.min(fieldLimit, magneticState.h + fieldIncrement))} disabled={magneticState.h >= fieldLimit} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-45"><Plus size={16} />Increase field</button>
              <button type="button" onClick={() => updateField(Math.max(-fieldLimit, magneticState.h - fieldIncrement))} disabled={magneticState.h <= -fieldLimit} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-45"><Minus size={16} />Decrease field</button>
            </div>
            <button type="button" onClick={reset} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"><RotateCcw size={15} />Reset to demagnetised</button>
          </Panel>
          <Panel className="p-5 sm:p-6">
            <PanelHeading title="Live magnetic state" />
            <dl className="space-y-3">
              <div className="flex items-baseline justify-between gap-3"><dt className="text-sm text-slate-600">Selected material</dt><dd className="text-right text-sm font-semibold text-[#17324d]">{material.name}</dd></div>
              <div className="flex items-baseline justify-between gap-3"><dt className="text-sm text-slate-600">Field strength H</dt><dd className="text-right text-sm font-semibold tabular-nums text-[#17324d]">{magneticState.h.toLocaleString(undefined, { maximumFractionDigits: 1 })} A/m</dd></div>
              <div className="flex items-baseline justify-between gap-3"><dt className="text-sm text-slate-600">Flux density B</dt><dd className="text-right text-sm font-semibold tabular-nums text-[#17324d]">{magneticState.b.toFixed(4)} T</dd></div>
              <div className="border-t border-slate-100 pt-3"><dt className="text-sm text-slate-600">Magnetic state</dt><dd className="mt-1 text-sm font-semibold text-cyan-800">{describeMagneticState(magneticState, material)}</dd></div>
            </dl>
          </Panel>
          <Panel className="p-5 sm:p-6">
            <div className="flex gap-2 text-xs leading-5 text-cyan-950"><Info size={16} className="mt-0.5 shrink-0 text-cyan-800" /><p><strong>Illustrative model assumptions.</strong> Bs, Br and Hc do not uniquely determine a real material’s hysteresis curve. Branch shape and reversal memory are simplified assumptions, not measured data.</p></div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] leading-5 text-slate-600">{hysteresisModelAssumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul>
          </Panel>
        </div>
      </div>
    </PageContainer>
  );
};

export default Simulator;
