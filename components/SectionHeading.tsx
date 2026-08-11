interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div className={`space-y-3 ${isCenter ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-[var(--copper)] opacity-70" aria-hidden="true" />
        <p className="text-eyebrow">{eyebrow}</p>
      </div>
      <h2 className="text-section-title">{title}</h2>
      {description && (
        <p
          className={`mt-2 text-[1rem] leading-relaxed text-[var(--text-secondary)] ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
