import type { IssueStatus } from "../data/issues"
import { STATUS_LABELS } from "../data/issues"

interface Props {
  status: IssueStatus
  size?: "sm" | "md"
}

const STYLES: Record<IssueStatus, string> = {
  reported: "bg-red-950/60 text-red-400 border-red-800/60",
  inprogress: "bg-yellow-950/60 text-yellow-400 border-yellow-700/60",
  resolved: "bg-green-950/60 text-green-400 border-green-800/60",
}

const DOTS: Record<IssueStatus, string> = {
  reported: "bg-red-500",
  inprogress: "bg-yellow-400",
  resolved: "bg-green-500",
}

export default function StatusBadge({ status, size = "md" }: Props) {
  const textSize = size === "sm" ? "text-[10px]" : "text-xs"
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide ${textSize} ${padding} ${STYLES[status]}`}
    >
      <span className={`rounded-full shrink-0 ${dotSize} ${DOTS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  )
}
