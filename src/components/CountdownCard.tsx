interface CountdownCardProps {
  value: number | string
  label: string
}

export default function CountdownCard({ value, label }: CountdownCardProps) {
  return (
    <div className="countdown-card">
      <span>{String(value).padStart(2, '0')}</span>
      <p>{label}</p>
    </div>
  )
}
