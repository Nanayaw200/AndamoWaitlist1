interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export default function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <article className={`feature-card ${className}`}>
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

