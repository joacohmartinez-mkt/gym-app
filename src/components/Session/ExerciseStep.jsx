// Paso 2: un ejercicio (no serie por serie). Mostrás la imagen, hacés tus series
// y al final cargás el peso una vez (pre-cargado) + confirmás series/reps → "Hecho".
import { useState } from 'react'
import { getMedia } from '../../data/exerciseLibrary'
import { IconInfo, IconAlert, IconBook } from '../icons'
import { RestSheet } from './RestSheet'

function parseReps(reps) {
  const m = String(reps).match(/\d+/)
  return m ? m[0] : ''
}

export function ExerciseStep({
  exercise,
  position,
  total,
  lastSet,
  loggedSets,
  deloadTarget,
  isDeload,
  restDefault,
  onComplete,
  onOpenInfo,
  onBack,
}) {
  const media = getMedia(exercise.exId)
  const logged = loggedSets && loggedSets.length ? loggedSets[0] : null

  const [weight, setWeight] = useState(
    logged ? String(logged.weight) : lastSet ? String(lastSet.weight) : '',
  )
  const [series, setSeries] = useState(
    loggedSets && loggedSets.length ? loggedSets.length : exercise.sets,
  )
  const [reps, setReps] = useState(
    logged ? String(logged.reps) : parseReps(exercise.reps),
  )
  const [restOpen, setRestOpen] = useState(false)

  const isTime = /seg/i.test(exercise.reps)
  const stepSeries = (v) => setSeries(Math.min(10, Math.max(1, v)))

  return (
    <div className="exercise">
      <div className="exercise-top">
        <span className="step-sub tnum">
          Ejercicio {position} de {total}
        </span>
        {exercise.optional ? <span className="badge badge--phase">Opcional</span> : null}
      </div>

      <div className="exercise-name-row">
        <h2 className="exercise-name">{exercise.name}</h2>
        <button
          type="button"
          className="info-btn"
          onClick={onOpenInfo}
          aria-label="Información del ejercicio"
        >
          <IconInfo />
        </button>
      </div>

      {media && media.imageA ? (
        <div className="ab-grid" style={{ marginTop: 'var(--s-3)' }}>
          <figure className="ab-item">
            <img className="eximg eximg--ab" src={media.imageA} alt="Inicio" loading="lazy" />
            <figcaption className="ab-cap">Inicio</figcaption>
          </figure>
          <figure className="ab-item">
            <img className="eximg eximg--ab" src={media.imageB} alt="Fin" loading="lazy" />
            <figcaption className="ab-cap">Fin</figcaption>
          </figure>
        </div>
      ) : (
        <div className="eximg eximg--empty eximg--big" style={{ marginTop: 'var(--s-3)' }}>
          <IconBook />
          <span>Imagen próximamente</span>
        </div>
      )}

      {exercise.note ? <p className="exercise-note">{exercise.note}</p> : null}

      <div className="target-line">
        <span className="target-reps">
          Objetivo: <strong className="tnum">{exercise.sets} × {exercise.reps}</strong>
        </span>
        {lastSet ? (
          <span className="hint tnum">
            Última vez: {lastSet.weight} kg × {lastSet.reps}
          </span>
        ) : null}
      </div>

      {isDeload ? (
        <div className="hint hint--deload">
          <IconAlert />
          {deloadTarget > 0
            ? `Descarga: apuntá a ~${deloadTarget} kg (60% de tu máximo)`
            : 'Semana de descarga: usá ~60% de tu peso habitual'}
        </div>
      ) : null}

      <label className="field field--big">
        <span>Peso (kg)</span>
        <input
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="0"
        />
      </label>

      <div className="log-grid">
        <div className="field">
          <span>Series hechas</span>
          <div className="stepper">
            <button type="button" onClick={() => stepSeries(series - 1)} aria-label="Menos series">−</button>
            <span className="tnum">{series}</span>
            <button type="button" onClick={() => stepSeries(series + 1)} aria-label="Más series">+</button>
          </div>
        </div>
        <label className="field">
          <span>{isTime ? 'Segundos' : 'Reps'}</span>
          <input
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
      </div>

      <button
        type="button"
        className="btn btn--cta"
        onClick={() => onComplete(Number(weight) || 0, Number(reps) || 0, series)}
      >
        Ejercicio hecho
      </button>
      <button type="button" className="btn btn--secondary" onClick={() => setRestOpen(true)}>
        Descanso
      </button>
      <button type="button" className="btn btn--ghost" onClick={onBack}>
        Volver a la lista
      </button>

      {restOpen ? <RestSheet initial={restDefault} onClose={() => setRestOpen(false)} /> : null}
    </div>
  )
}
