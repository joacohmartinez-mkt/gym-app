// Nutrición — referencia (no es un tracker).
import { NUTRITION_GOALS, NUTRITION_TIMING, PROTEIN_SOURCES } from '../../data/nutrition'
import { IconChevronLeft } from '../icons'

export function NutritionScreen({ onBack }) {
  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Más
      </button>
      <h2 className="detail-title" style={{ marginBottom: 'var(--s-4)' }}>Nutrición</h2>

      <div className="plan-title">Objetivos diarios</div>
      <div className="goal-grid">
        {NUTRITION_GOALS.map((g) => (
          <div key={g.label} className="goal-card">
            <div className="goal-value tnum">{g.value}</div>
            <div className="goal-label">{g.label}</div>
          </div>
        ))}
      </div>

      <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>Timing</div>
      {NUTRITION_TIMING.map((t) => (
        <div key={t.when} className="rt-ex">
          <div className="rt-ex-name">{t.when}</div>
          <div className="rt-ex-note">
            {t.what}
            {t.example ? ` Ej: ${t.example}.` : ''}
          </div>
        </div>
      ))}

      <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>Fuentes de proteína</div>
      <div className="rt-warmup">
        {PROTEIN_SOURCES.map((p) => (
          <span key={p} className="rt-warmup-item">{p}</span>
        ))}
      </div>

      <p className="cta-sub" style={{ marginTop: 'var(--s-5)' }}>
        Es una referencia, no un registro de comidas.
      </p>
    </div>
  )
}
