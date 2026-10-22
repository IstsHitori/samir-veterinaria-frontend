import { PawPrint, ShieldCheck } from "lucide-react";

interface HeaderSidedarProps {
  role: string;
}

export default function HeaderSidedar({ role }: HeaderSidedarProps) {
  return (
    <div className="space-y-4 px-3 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-md shadow-violet-200">
          <PawPrint aria-hidden="true" className="size-6" />
        </div>
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <h2 className="truncate text-lg font-bold tracking-tight text-slate-900">
            SynthPet<span className="text-violet-600">.</span>
          </h2>
          <p className="truncate text-xs text-slate-500">Gestión veterinaria</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 group-data-[collapsible=icon]:hidden">
        <ShieldCheck
          aria-hidden="true"
          className="size-4 shrink-0 text-emerald-600"
        />
        <span className="truncate text-xs font-medium text-slate-600">
          Sesión activa
        </span>
        <span className="ml-auto truncate rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
          {role}
        </span>
      </div>
    </div>
  );
}
