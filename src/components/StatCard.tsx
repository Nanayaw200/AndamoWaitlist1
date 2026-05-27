interface StatCardProps {
  value: string
  label: string
  className?: string
}

export default function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div className={`stats-cell ${className}`}>
      <span>{value}</span>
      <p>{label}</p>
    </div>
  )
}

