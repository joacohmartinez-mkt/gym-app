// Controlador del flujo de sesión: calentamiento → lista de ejercicios ⇄ ejercicio
// (con descanso entre series) → cierre. Overlays: registrar síntoma e info del ejercicio.
import { useState } from 'react'
import { useHistory } from '../../hooks/useHistory'
import { useAppData } from '../../context/AppDataContext'
import { getExercise } from '../../data/exercises'
import { IconChevronLeft, IconAlert, IconClose } from '../icons'
import { WarmupStep } from './WarmupStep'
import { ExerciseList } from './ExerciseList'
import { ExerciseStep } from './ExerciseStep'
import { PostSession } from './PostSession'

// Bottom sheet para escribir un síntoma.
function SymptomSheet({ exerciseName, onSave, onClose }) {
  const [text, setText] = useState('')
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h3>Registrar síntoma</h3>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="Cerrar">
            <IconClose />
          </button>
        </div>
        <p className="step-sub">En: {exerciseName}</p>
        <label className="field field--block">
          <span>¿Qué sentiste?</span>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ej: leve tirón lumbar, hormigueo, molestia…"
            autoFocus
          />
        </label>
        <button
          type="button"
          className="btn btn--primary"
          disabled={!text.trim()}
          onClick={() => {
            onSave(text.trim())
            onClose()
          }}
        >
          Guardar síntoma
        </button>
      </div>
    </div>
  )
}

// Panel con la descripción técnica y por qué es seguro para L5-S1.
function InfoSheet({ exId, onClose }) {
  const ex = getExercise(exId)
  if (!ex) return null
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h3>{ex.name}</h3>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="Cerrar">
            <IconClose />
          </button>
        </div>
        <p className="info-section-title">Ejecución</p>
        <p className="info-text">{ex.execution}</p>
        <p className="info-section-title">Por qué es seguro para L5-S1</p>
        <p className="info-text">{ex.whyL5S1}</p>
      </div>
    </div>
  )
}

export function SessionFlow({ workout, onMinimize }) {
  const { active, day } = workout
  const { lastSetForExercise, maxWeightForExercise } = useHistory()
  const { config } = useAppData()
  const [symptomOpen, setSymptomOpen] = useState(false)
  const [infoExId, setInfoExId] = useState(null)

  if (!active || !day) return null

  // 'rest' es un step legacy (versión vieja) → se trata como 'exercise'.
  const inExercise = active.step === 'exercise' || active.step === 'rest'
  const i = Math.min(active.currentIndex ?? 0, day.exercises.length - 1)
  const exDef = day.exercises[i]
  const doneCount = active.results.filter(
    (r, idx) => r.sets.length >= day.exercises[idx].sets,
  ).length

  const durationSec = Math.max(
    0,
    Math.round((Date.now() - new Date(active.startedAt).getTime()) / 1000),
  )

  let header = 'Calentamiento'
  if (active.step === 'list') header = `${doneCount} de ${day.exercises.length} hechos`
  else if (inExercise) header = exDef.name
  else if (active.step === 'post') header = 'Resumen'

  // El chevron retrocede un nivel: de ejercicio/descanso vuelve a la lista; si no, minimiza.
  const onBack = inExercise ? workout.goToList : onMinimize

  return (
    <div className="session">
      <header className="session-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Volver">
          <IconChevronLeft />
        </button>
        <div className="session-title">
          <div className="session-day">
            Día {active.dayType}
            {active.isExtra ? ' · Extra' : ''}
          </div>
          <div className="session-progress">{header}</div>
        </div>
        <span className="icon-btn icon-btn--ghost" aria-hidden="true" />
      </header>

      <div className="session-body">
        {active.step === 'warmup' && (
          <WarmupStep
            warmup={day.warmup}
            checked={active.warmupChecked}
            onToggle={workout.toggleWarmup}
            onContinue={workout.goToList}
          />
        )}

        {active.step === 'list' && (
          <ExerciseList
            exercises={day.exercises}
            results={active.results}
            onOpen={workout.openExercise}
            onFinish={workout.goToPost}
          />
        )}

        {inExercise && (
          <ExerciseStep
            key={i}
            exercise={exDef}
            position={i + 1}
            total={day.exercises.length}
            lastSet={lastSetForExercise(exDef.exId)}
            loggedSets={active.results[i]?.sets}
            deloadTarget={Math.round(maxWeightForExercise(exDef.exId) * 0.6)}
            isDeload={active.isDeload}
            restDefault={exDef.isMain ? config.restMain : config.restAccessory}
            onComplete={workout.completeExercise}
            onOpenInfo={() => setInfoExId(exDef.exId)}
            onBack={workout.goToList}
          />
        )}

        {active.step === 'post' && (
          <PostSession
            results={active.results}
            durationSec={durationSec}
            symptomsCount={active.symptoms.length}
            onFinish={workout.finish}
          />
        )}
      </div>

      {active.step !== 'post' && (
        <button
          type="button"
          className="symptom-fab"
          onClick={() => setSymptomOpen(true)}
        >
          <IconAlert />
          Registrar síntoma
        </button>
      )}

      {symptomOpen && (
        <SymptomSheet
          exerciseName={inExercise ? exDef.name : 'la sesión'}
          onSave={workout.addSymptom}
          onClose={() => setSymptomOpen(false)}
        />
      )}

      {infoExId && <InfoSheet exId={infoExId} onClose={() => setInfoExId(null)} />}
    </div>
  )
}
