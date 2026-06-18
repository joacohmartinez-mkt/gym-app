// Lista de ejercicios del día. El usuario elige cuál hacer y en qué orden.
// Estado por ejercicio: pendiente / en curso / hecho.
import { IconCheck } from '../icons'

export function ExerciseList({ exercises, results, onOpen, onFinish }) {
  const doneCount = results.filter((r, i) => r.sets.length >= exercises[i].sets).length

  return (
    <div className="exlist">
      <h2 className="step-heading">Ejercicios</h2>
      <p className="step-sub tnum">
        {doneCount} de {exercises.length} hechos · tocá el que quieras
      </p>

      <ul className="exlist-items">
        {exercises.map((ex, i) => {
          const count = results[i].sets.length
          const done = count >= ex.sets
          const partial = !done && count > 0
          const status = done ? 'done' : partial ? 'partial' : 'pending'
          return (
            <li key={i}>
              <button
                type="button"
                className={`exrow exrow--${status}`}
                onClick={() => onOpen(i)}
              >
                <span className="exrow-check">{done ? <IconCheck /> : null}</span>
                <span className="exrow-main">
                  <span className="exrow-name">
                    {ex.name}
                    {ex.optional ? ' · opcional' : ''}
                  </span>
                  <span className="exrow-meta tnum">
                    {done
                      ? 'Hecho'
                      : partial
                        ? `En curso · ${count}/${ex.sets} series`
                        : `${ex.sets} × ${ex.reps}`}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <button type="button" className="btn btn--cta" onClick={onFinish}>
        Terminar sesión
      </button>
    </div>
  )
}
