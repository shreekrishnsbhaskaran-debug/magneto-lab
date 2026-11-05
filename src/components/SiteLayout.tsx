import { Atom, Magnet } from "lucide-react";
import { NavLink, Link, Outlet } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Materials", to: "/materials" },
  { label: "B–H Simulator", to: "/simulator" },
  { label: "Material Comparison", to: "/comparison" },
];

const SiteLayout = () => (
  <div className="min-h-screen bg-[#f5f8fb] text-[#17324d]">
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="MagnetoLab home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Magnet size={21} /></span>
          <span><span className="block text-sm font-bold tracking-tight">MagnetoLab</span><span className="text-[11px] text-slate-500">B–H curve explorer</span></span>
        </Link>
        <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 md:flex"><Atom size={15} className="text-cyan-700" /> Magnetic materials laboratory</div>
        <nav aria-label="Main navigation" className="order-3 -mx-5 flex w-[calc(100%+2.5rem)] gap-1 overflow-x-auto border-t border-slate-100 px-4 pt-2 md:order-none md:mx-0 md:w-auto md:border-0 md:p-0">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => `shrink-0 rounded-lg px-3 py-2 text-[13px] font-medium transition ${isActive ? "bg-cyan-50 text-cyan-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>{link.label}</NavLink>)}
        </nav>
      </div>
    </header>
    <Outlet />
    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-5 py-5 text-xs text-slate-500 sm:px-8">MagnetoLab · Illustrative educational reference; parameters are not certified experimental values.</div></footer>
  </div>
);

export default SiteLayout;

export const PageHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <div className="mb-8 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{eyebrow}</p><h1 className="text-4xl font-semibold tracking-tight text-[#15324d] sm:text-5xl">{title}</h1><p className="mt-4 text-base leading-7 text-slate-600">{description}</p></div>
);

export const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;

export const PageContainer = ({ children }: { children: React.ReactNode }) => <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">{children}</main>;
export const PanelHeading = ({ title, hint }: { title: string; hint?: string }) => <div className="mb-4"><h2 className="font-semibold text-[#17324d]">{title}</h2>{hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}</div>;
