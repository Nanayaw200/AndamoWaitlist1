interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stats-cell">
      <span>{value}</span>
      <p>{label}</p>
    </div>
  )
}
