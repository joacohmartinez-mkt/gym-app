// Detalle de una sesión: ejercicios con pesos/reps, síntomas y nota general.
// Tocar un ejercicio abre su progresión (un nivel más adentro).
import { formatLong, parseDateKey } from '../../lib/dates'
import { IconChevronLeft, IconChevronRight, IconAlert } from '../icons'

function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatDuration(sec) {
  const min = Math.round((sec || 0) / 60)
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  return `${h} h ${String(min % 60).padStart(2, '0')}`
}

export function SessionDetail({ session, onBack, onOpenExercise }) {
  const totalSets = session.exercises.reduce((n, e) => n + e.sets.length, 0)
  const symptoms = session.symptoms || []

  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Historial
      </button>

      <div className="detail-head">
        <h2 className="detail-title">Día {session.dayType}</h2>
        <p className="detail-sub">
          {capFirst(formatLong(parseDateKey(session.dateKey)))} · Semana{' '}
          {session.programWeek} · Fase {session.phase}
        </p>
        <div className="detail-badges">
          <span className="badge badge--phase tnum">{formatDuration(session.durationSec)}</span>
          <span className="badge badge--phase tnum">{session.exercises.length} ej · {totalSets} series</span>
          {session.isDeload ? <span className="badge badge--deload">Descarga</span> : null}
          {session.isExtra ? <span className="badge badge--phase">Extra</span> : null}
        </div>
      </div>

      {session.generalNote ? (
        <div className="card" style={{ marginBottom: 'var(--s-4)' }}>
          <div className="plan-title">Cómo te sentiste</div>
          <p style={{ color: 'var(--text)', marginTop: 4 }}>{session.generalNote}</p>
        </div>
      ) : null}

      {symptoms.length > 0 ? (
        <div className="symptom-block">
          <div className="symptom-block-head">
            <IconAlert />
            {symptoms.length} {symptoms.length === 1 ? 'síntoma' : 'síntomas'}
          </div>
          {symptoms.map((s, i) => (
            <div key={i} className="symptom-item">
              <span className="symptom-item-text">{s.text}</span>
              <span className="symptom-item-meta">
                {s.exerciseName}
                {s.time ? ` · ${s.time}` : ''}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="plan-title">Ejercicios</div>
      <ul className="exlist-items" style={{ marginTop: 'var(--s-2)' }}>
        {session.exercises.map((e, i) => (
          <li key={i}>
            <button
              type="button"
              className="exrow"
              onClick={() => onOpenExercise(e.exId)}
            >
              <span className="exrow-main">
                <span className="exrow-name">{e.name}</span>
                <span className="exrow-sets">
                  {e.sets.map((set, j) => (
                    <span key={j} className="setchip tnum">
                      {set.weight}×{set.reps}
                    </span>
                  ))}
                </span>
              </span>
              <IconChevronRight className="exrow-arrow" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
