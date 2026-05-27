interface HeroVisualCardProps {
  emoji: string
  label: string
}

export default function HeroVisualCard({ emoji, label }: HeroVisualCardProps) {
  return (
    <div className="hero-visual-card">
      <span>{emoji}</span>
      <p>{label}</p>
    </div>
  )
}
