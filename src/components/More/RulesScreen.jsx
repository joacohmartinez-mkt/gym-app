// Reglas y alertas para discopatía L5-S1.
import { RULES_DO, ALERTS_STOP_EXERCISE, ALERTS_SEE_DOCTOR } from '../../data/rules'
import { IconChevronLeft, IconCheck, IconAlert } from '../icons'

export function RulesScreen({ onBack }) {
  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Más
      </button>
      <h2 className="detail-title" style={{ marginBottom: 'var(--s-4)' }}>Reglas y alertas</h2>

      <div className="plan-title">Qué sí hacer</div>
      <ul className="rule-list">
        {RULES_DO.map((r, i) => (
          <li key={i} className="rule-item rule-item--ok">
            <IconCheck />
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <div className="alert-block alert-block--stop">
        <div className="alert-block-head">
          <IconAlert />
          Pará ese ejercicio ese día si aparece:
        </div>
        <ul className="rule-list">
          {ALERTS_STOP_EXERCISE.map((r, i) => (
            <li key={i} className="rule-item">{r}</li>
          ))}
        </ul>
      </div>

      <div className="alert-block alert-block--doctor">
        <div className="alert-block-head">
          <IconAlert />
          Consultá al médico si:
        </div>
        <ul className="rule-list">
          {ALERTS_SEE_DOCTOR.map((r, i) => (
            <li key={i} className="rule-item">{r}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
