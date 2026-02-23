import { type LucideIcon } from 'lucide-react'

export interface BatchCardProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  title: string
  value: number | string
}

export function BatchCard({ icon, iconColor, iconBgColor, title, value }: BatchCardProps) {
  const Icon = icon
  return (
    <div className="bg-white p-6 w-75 flex flex-col gap-4 rounded-xl cursor-pointer">
      <div style={{ backgroundColor: iconBgColor }} className="w-13 p-3 rounded-xl">
        <Icon size={25} style={{ color: iconColor }} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[#64748B] text-sm">{title}</p>
        <span className="font-bold text-3xl text-[#0F172A]">{value}</span>
      </div>
    </div>
  )
}
