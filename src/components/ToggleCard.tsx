import type { LucideIcon } from 'lucide-react'

interface ToggleProps {
  label: string
  description?: string
  checked: boolean
  icon: LucideIcon
  onChange: (value: boolean) => void
  disabled?: boolean
}

export function ToggleCard({
  label,
  description,
  checked,
  icon: Icon,
  onChange,
  disabled = false,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl border border-slate-200">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition
            ${checked ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}
        >
          <Icon size={22} strokeWidth={2} />
        </div>

        <div>
          <p className="font-semibold text-slate-800">{label}</p>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
          ${checked ? 'bg-green-500' : 'bg-slate-300'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  )
}
