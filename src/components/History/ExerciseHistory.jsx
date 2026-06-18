// Detalle de un ejercicio en el historial: lo más usado es "última vez (peso × reps)";
// el gráfico de progresión va debajo, un nivel más adentro.
import { useHistory } from '../../hooks/useHistory'
import { getExercise } from '../../data/exercises'
import { formatShort, parseDateKey } from '../../lib/dates'
import { ProgressChart } from './ProgressChart'
import { IconChevronLeft } from '../icons'

export function ExerciseHistory({ exId, onBack }) {
  const { exerciseSeries } = useHistory()
  const series = exerciseSeries(exId)
  const ex = getExercise(exId)
  const name = ex ? ex.name : exId
  const last = series[series.length - 1]

  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Volver
      </button>

      <h2 className="detail-title">{name}</h2>

      {last ? (
        <div className="lastbig">
          <div className="lastbig-label">Última vez</div>
          <div className="lastbig-value tnum">
            {last.weight} kg × {last.reps}
          </div>
          <div className="lastbig-date">{formatShort(parseDateKey(last.dateKey))}</div>
        </div>
      ) : (
        <p className="step-sub">Todavía no hay registros de este ejercicio.</p>
      )}

      {series.length >= 2 ? (
        <>
          <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>
            Progresión de peso
          </div>
          <ProgressChart series={series} />
        </>
      ) : null}

      {series.length > 0 ? (
        <>
          <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>
            Historial
          </div>
          <ul className="hist-mini">
            {series
              .slice()
              .reverse()
              .map((d, i) => (
                <li key={i} className="hist-mini-row">
                  <span className="hist-mini-date">
                    {formatShort(parseDateKey(d.dateKey))}
                  </span>
                  <span className="hist-mini-val tnum">
                    {d.weight} kg × {d.reps}
                  </span>
                </li>
              ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}
