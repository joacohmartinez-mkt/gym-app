// Paso 3: cierre. Resumen + "¿Cómo te sentiste hoy?" + cerrar sesión.
import { useState } from 'react'
import { IconCheck } from '../icons'

function formatDuration(sec) {
  const min = Math.round(sec / 60)
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  return `${h} h ${String(min % 60).padStart(2, '0')}`
}

export function PostSession({ results, durationSec, symptomsCount, onFinish }) {
  const [feeling, setFeeling] = useState('')
  const doneExercises = results.filter((r) => r.sets.length > 0)
  const totalSets = doneExercises.reduce((acc, r) => acc + r.sets.length, 0)

  return (
    <div className="post">
      <IconCheck className="post-icon" />
      <h2 className="step-heading post-title">Sesión completa</h2>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-value tnum">{doneExercises.length}</div>
          <div className="stat-label">ejercicios</div>
        </div>
        <div className="stat">
          <div className="stat-value tnum">{totalSets}</div>
          <div className="stat-label">series</div>
        </div>
        <div className="stat">
          <div className="stat-value tnum">{formatDuration(durationSec)}</div>
          <div className="stat-label">duración</div>
        </div>
      </div>

      {symptomsCount > 0 ? (
        <p className="step-sub">
          Registraste {symptomsCount} {symptomsCount === 1 ? 'síntoma' : 'síntomas'} en
          esta sesión.
        </p>
      ) : null}

      <label className="field field--block">
        <span>¿Cómo te sentiste hoy?</span>
        <textarea
          rows={3}
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="Opcional"
        />
      </label>

      <button type="button" className="btn btn--cta" onClick={() => onFinish(feeling)}>
        Cerrar sesión
      </button>
    </div>
  )
}
