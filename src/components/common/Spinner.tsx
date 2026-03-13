import { Loader2 } from "lucide-react"

export const Spinner = ({ size = 18 }: { size?: number }) => (
  <Loader2 className="animate-spin" size={size} />
)