// Tab RUTINA — referencia + edición. Editás series/reps/notas y podés reemplazar
// un ejercicio por otro de la biblioteca. Los cambios se guardan como overrides y
// afectan las sesiones futuras (y el preview de Hoy).
import { useState } from 'react'
import { PHASES, applyOverridesToDay, overrideKey } from '../../data/routine'
import { EXERCISES } from '../../data/exercises'
import { useProgram } from '../../hooks/useProgram'
import { useAppData } from '../../context/AppDataContext'
import { IconClose } from '../icons'

const DAYS = ['A', 'B', 'C']

export function RoutineScreen() {
  const program = useProgram()
  const { routineOverrides, setOverride, resetOverride } = useAppData()
  const [phaseId, setPhaseId] = useState(program.phase.id)
  const [dayId, setDayId] = useState('A')
  const [editMode, setEditMode] = useState(false)
  const [pickerIndex, setPickerIndex] = useState(null)

  const phase = PHASES.find((p) => p.id === phaseId) || PHASES[0]
  const baseDay = phase.days[dayId]
  const day = applyOverridesToDay(phaseId, dayId, baseDay, routineOverrides)

  // Ejercicios efectivos con su índice original y si están editados.
  const exercises = day.exercises.map((ex, i) => ({
    ...ex,
    _i: i,
    _over: !!routineOverrides[overrideKey(phaseId, dayId, i)],
  }))

  const groups = []
  for (const ex of exercises) {
    let g = groups.find((x) => x.name === ex.group)
    if (!g) {
      g = { name: ex.group, items: [] }
      groups.push(g)
    }
    g.items.push(ex)
  }

  const stepSets = (i, value) => setOverride(phaseId, dayId, i, { sets: Math.min(10, Math.max(1, value)) })

  return (
    <div className="screen">
      <div className="rt-head">
        <p className="screen-title" style={{ margin: 0 }}>Rutina</p>
        <button
          type="button"
          className={`rt-edit-toggle${editMode ? ' rt-edit-toggle--on' : ''}`}
          onClick={() => setEditMode((v) => !v)}
        >
          {editMode ? 'Listo' : 'Editar'}
        </button>
      </div>

      <div className="seg-row">
        {PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`seg${p.id === phaseId ? ' seg--on' : ''}`}
            onClick={() => setPhaseId(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="rt-weeks tnum">
        Semanas {phase.weeks[0]}–{phase.weeks[phase.weeks.length - 1]}
      </p>

      <div className="seg-row">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            className={`seg${d === dayId ? ' seg--on' : ''}`}
            onClick={() => setDayId(d)}
          >
            Día {d}
          </button>
        ))}
      </div>

      {!editMode ? (
        <>
          <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>Calentamiento</div>
          <div className="rt-warmup">
            {day.warmup.map((w) => (
              <span key={w.id} className="rt-warmup-item">{w.label}</span>
            ))}
          </div>
        </>
      ) : null}

      {groups.map((g) => (
        <div key={g.name} className="rt-group">
          <div className="rt-group-title">{g.name}</div>
          {g.items.map((ex) => (
            <div key={ex._i} className={`rt-ex${editMode ? ' rt-ex--edit' : ''}`}>
              <div className="rt-ex-head">
                <span className="rt-ex-name">
                  {ex.name}
                  {ex.optional ? ' · opcional' : ''}
                  {ex._over ? <span className="edited-tag">editado</span> : null}
                </span>
                {editMode ? (
                  <button type="button" className="rt-swap" onClick={() => setPickerIndex(ex._i)}>
                    Cambiar
                  </button>
                ) : (
                  <span className="rt-ex-sr tnum">{ex.sets} × {ex.reps}</span>
                )}
              </div>

              {editMode ? (
                <>
                  <div className="rt-edit-grid">
                    <div className="field-mini">
                      <span>Series</span>
                      <div className="stepper">
                        <button type="button" onClick={() => stepSets(ex._i, ex.sets - 1)} aria-label="Menos series">−</button>
                        <span className="tnum">{ex.sets}</span>
                        <button type="button" onClick={() => stepSets(ex._i, ex.sets + 1)} aria-label="Más series">+</button>
                      </div>
                    </div>
                    <label className="field-mini">
                      <span>Reps</span>
                      <input
                        type="text"
                        value={ex.reps}
                        onChange={(e) => setOverride(phaseId, dayId, ex._i, { reps: e.target.value })}
                      />
                    </label>
                  </div>
                  <label className="field-mini" style={{ marginTop: 'var(--s-2)' }}>
                    <span>Nota</span>
                    <input
                      type="text"
                      value={ex.note || ''}
                      onChange={(e) => setOverride(phaseId, dayId, ex._i, { note: e.target.value })}
                      placeholder="Sin nota"
                    />
                  </label>
                  {ex._over ? (
                    <button
                      type="button"
                      className="rt-reset"
                      onClick={() => resetOverride(phaseId, dayId, ex._i)}
                    >
                      Restaurar original
                    </button>
                  ) : null}
                </>
              ) : ex.note ? (
                <div className="rt-ex-note">{ex.note}</div>
              ) : null}
            </div>
          ))}
        </div>
      ))}

      {pickerIndex !== null ? (
        <div className="sheet-backdrop" onClick={() => setPickerIndex(null)}>
          <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <h3>Cambiar ejercicio</h3>
              <button type="button" className="sheet-close" onClick={() => setPickerIndex(null)} aria-label="Cerrar">
                <IconClose />
              </button>
            </div>
            <div className="picker-list">
              {Object.values(EXERCISES).map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="picker-item"
                  onClick={() => {
                    setOverride(phaseId, dayId, pickerIndex, {
                      exId: e.id,
                      name: e.name,
                      note: '',
                    })
                    setPickerIndex(null)
                  }}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
