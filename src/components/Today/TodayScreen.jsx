// Tab HOY — en 2 segundos el usuario sabe qué entrenar.
// Estados: día normal · ya entrenó hoy · semana completada · programa terminado.

import { useState } from 'react'
import { useProgram } from '../../hooks/useProgram'
import { useAppData } from '../../context/AppDataContext'
import { getEffectiveDay } from '../../data/routine'
import { formatLong } from '../../lib/dates'
import { parseDateKey } from '../../lib/dates'
import { IconAlert, IconCheck, IconPlay } from '../icons'

function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatDuration(sec) {
  if (!sec || sec < 60) return `${sec || 0} s`
  const min = Math.round(sec / 60)
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h} h ${String(m).padStart(2, '0')}`
}

function countSets(session) {
  return (session.exercises || []).reduce(
    (acc, e) => acc + (e.sets ? e.sets.length : 0),
    0,
  )
}

// Encabezado: semana · fase, fecha y badge de descarga.
function TodayHeader({ program, userName }) {
  return (
    <div className="today-top">
      <div>
        {userName ? (
          <div className="today-date" style={{ marginBottom: 2 }}>
            Hola, {userName}
          </div>
        ) : null}
        <div className="today-week">
          Semana {program.currentWeek} · {program.phase.name}
        </div>
        <div className="today-date">{capFirst(formatLong(program.now))}</div>
      </div>
      {program.deload ? (
        <span className="badge badge--deload-strong">
          <IconAlert />
          Semana de descarga
        </span>
      ) : null}
    </div>
  )
}

function DeloadNote() {
  return (
    <p className="cta-sub">
      En la descarga los pesos objetivo bajan al 60% de tu máximo. Cuidá la técnica.
    </p>
  )
}

const DAYS = ['A', 'B', 'C']

// Selector para empezar un día específico de inmediato (estados "ya entrenaste"
// y "semana completa"). `suggested` resalta el día que toca; `extra` lo marca extra.
function DayPicker({ suggested = null, extra = false, onPick, label = 'Entrenar otro día' }) {
  return (
    <div className="day-picker">
      <div className="day-picker-label">{label}</div>
      <div className="day-picker-row">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            className={`day-chip${d === suggested ? ' day-chip--suggested' : ''}`}
            onClick={() => onPick({ dayType: d, isExtra: extra })}
          >
            Día {d}
          </button>
        ))}
      </div>
    </div>
  )
}

// Selector que solo CAMBIA el día visualizado (no arranca). Resalta el elegido.
function DaySelector({ selected, onSelect }) {
  return (
    <div className="day-picker">
      <div className="day-picker-label">Elegí el día</div>
      <div className="day-picker-row">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            className={`day-chip${d === selected ? ' day-chip--suggested' : ''}`}
            onClick={() => onSelect(d)}
            aria-pressed={d === selected}
          >
            Día {d}
          </button>
        ))}
      </div>
    </div>
  )
}

// Preview del plan del día: bloques (grupos) con su cantidad y ejercicios.
function PlanPreview({ day, label = 'Plan de hoy' }) {
  const groups = []
  for (const ex of day.exercises) {
    let g = groups.find((x) => x.name === ex.group)
    if (!g) {
      g = { name: ex.group, items: [] }
      groups.push(g)
    }
    g.items.push(ex.name)
  }
  return (
    <div className="plan">
      <div className="plan-title">{label}</div>
      {groups.map((g) => (
        <div className="plan-row" key={g.name}>
          <div className="pr-head">
            <span className="pr-name">{g.name}</span>
            <span className="pr-count tnum">{g.items.length}</span>
          </div>
          <div className="pr-ex">{g.items.join(' · ')}</div>
        </div>
      ))}
    </div>
  )
}

// Resumen de la sesión que ya se hizo hoy.
function DoneToday({ session, onSeeDetail }) {
  const symptoms = session.symptoms ? session.symptoms.length : 0
  return (
    <div className="card done-card">
      <div className="done-head">
        <span className="badge badge--done">
          <IconCheck />
          Entrenaste hoy
        </span>
        {symptoms > 0 ? (
          <span className="badge badge--alert">
            <IconAlert />
            {symptoms} {symptoms === 1 ? 'síntoma' : 'síntomas'}
          </span>
        ) : null}
      </div>
      <h3>Día {session.dayType}</h3>
      <div className="stat-row">
        <div className="stat">
          <div className="stat-value tnum">{session.exercises?.length ?? 0}</div>
          <div className="stat-label">ejercicios</div>
        </div>
        <div className="stat">
          <div className="stat-value tnum">{countSets(session)}</div>
          <div className="stat-label">series</div>
        </div>
        <div className="stat">
          <div className="stat-value tnum">{formatDuration(session.durationSec)}</div>
          <div className="stat-label">duración</div>
        </div>
      </div>
      <button type="button" className="btn btn--secondary" onClick={onSeeDetail}>
        Ver detalle
      </button>
    </div>
  )
}

// Héroe del día. El día es seleccionable (A/B/C): el bloque y el plan reflejan
// el día elegido antes de arrancar. Por defecto, el que toca por rotación.
function DayHero({ program, onStart, overrides }) {
  const [selected, setSelected] = useState(program.dayType)
  const dayData = getEffectiveDay(program.currentWeek, selected, overrides)
  const groups = [...new Set(dayData.exercises.map((e) => e.group))]
  const sessionNumber = program.doneCount + 1
  const isSuggested = selected === program.dayType
  return (
    <>
      <div className="day-hero">
        <div className="day-kicker">{isSuggested ? 'Hoy entrenás' : 'Vas a entrenar'}</div>
        <div className="day-name">Día {selected}</div>
        <div className="day-focus">{groups.join(' · ')}</div>
        <div className="day-stats tnum">
          {dayData.exercises.length} ejercicios
          {program.deload ? ' · descarga' : ''}
        </div>
        <button
          type="button"
          className="btn btn--dark"
          onClick={() => onStart({ dayType: selected, isExtra: false })}
        >
          <IconPlay />
          Empezar sesión
        </button>
        <p className="day-sub tnum">Sesión {sessionNumber} de 3 de la semana</p>
      </div>

      {program.deload ? <DeloadNote /> : null}

      <DaySelector selected={selected} onSelect={setSelected} />

      <PlanPreview day={dayData} label={`Plan · Día ${selected}`} />
    </>
  )
}

// Semana completada / programa terminado.
function WeekComplete({ program, onStart, finished }) {
  return (
    <div className="week-complete">
      <IconCheck className="wc-icon" />
      <h2>{finished ? 'Programa completado' : 'Semana completada'}</h2>
      <p>
        {finished
          ? 'Completaste las 12 semanas del programa. Tremendo trabajo.'
          : 'Hiciste los 3 días de esta semana. Descansá y recuperá hasta la próxima.'}
      </p>
      <DayPicker extra onPick={onStart} label="Empezar sesión extra" />
    </div>
  )
}

// Sesión sin terminar → retomar o descartar (evita pisar la activa con una nueva).
function InProgressCard({ session, onResume, onDiscard }) {
  const [confirm, setConfirm] = useState(false)
  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div className="done-head">
        <span className="badge badge--phase">
          <IconPlay />
          Sesión en curso
        </span>
      </div>
      <h3>
        Día {session.dayType}
        {session.isExtra ? ' · Extra' : ''}
      </h3>
      <p className="step-sub" style={{ margin: '4px 0 16px' }}>
        Tenés una sesión sin terminar. Podés retomarla donde la dejaste.
      </p>
      <div className="card-actions">
        <button type="button" className="btn btn--cta" onClick={onResume}>
          <IconPlay />
          Retomar sesión
        </button>
        {confirm ? (
          <div className="confirm-row">
            <button type="button" className="btn btn--secondary" onClick={() => setConfirm(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn--danger" onClick={onDiscard}>
              Sí, descartar
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={() => setConfirm(true)}>
            Descartar sesión
          </button>
        )}
      </div>
    </div>
  )
}

export function TodayScreen({
  onStartSession,
  onGoTo,
  activeSession = null,
  onResume,
  onDiscard,
}) {
  const program = useProgram()
  const { config, routineOverrides } = useAppData()

  const trained = program.trainedToday

  // Completa el plan con el contexto del programa antes de iniciar la sesión.
  const handleStart = (plan) =>
    onStartSession({
      ...plan,
      programWeek: program.currentWeek,
      phase: program.phase.id,
      isDeload: program.deload,
    })

  return (
    <div className="screen">
      <TodayHeader program={program} userName={config.userName} />

      {activeSession ? (
        <InProgressCard
          session={activeSession}
          onResume={onResume}
          onDiscard={onDiscard}
        />
      ) : (
        <>
          {program.startsInFuture ? (
            <p className="cta-sub" style={{ marginBottom: 16 }}>
              Tu programa arranca el lunes{' '}
              {capFirst(formatLong(parseDateKey(config.startDate)))}.
            </p>
          ) : null}

          {trained ? (
            <>
              <DoneToday session={trained} onSeeDetail={() => onGoTo('history')} />
              {!program.weekComplete && !program.programFinished ? (
                <DayPicker
                  suggested={program.dayType}
                  onPick={handleStart}
                  label="Entrenar otro día"
                />
              ) : null}
            </>
          ) : program.programFinished ? (
            <WeekComplete program={program} onStart={handleStart} finished />
          ) : program.weekComplete ? (
            <WeekComplete program={program} onStart={handleStart} />
          ) : (
            <DayHero program={program} onStart={handleStart} overrides={routineOverrides} />
          )}
        </>
      )}
    </div>
  )
}
