// Lista de sesiones pasadas (más reciente primero). Fecha, día, duración y
// alerta si hubo síntomas.
import { formatLong, parseDateKey } from '../../lib/dates'
import { IconHistory, IconAlert, IconChevronRight } from '../icons'

function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatDuration(sec) {
  const min = Math.round((sec || 0) / 60)
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  return `${h} h ${String(min % 60).padStart(2, '0')}`
}

export function SessionList({ history, onOpen }) {
  if (!history.length) {
    return (
      <div className="screen">
        <p className="screen-title">Historial</p>
        <div className="placeholder">
          <IconHistory />
          <h2>Sin sesiones todavía</h2>
          <p>Cuando termines tu primera sesión, va a aparecer acá.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="screen-title">Historial</p>
      <ul className="exlist-items">
        {history.map((s) => {
          const symptoms = s.symptoms ? s.symptoms.length : 0
          return (
            <li key={s.id}>
              <button type="button" className="hist-row" onClick={() => onOpen(s)}>
                <span className="hist-day">{s.dayType}</span>
                <span className="hist-main">
                  <span className="hist-date">
                    {capFirst(formatLong(parseDateKey(s.dateKey)))}
                  </span>
                  <span className="hist-meta tnum">
                    {formatDuration(s.durationSec)} · {s.exercises.length} ejercicios
                  </span>
                </span>
                {symptoms > 0 ? (
                  <span className="badge badge--alert">
                    <IconAlert />
                    {symptoms}
                  </span>
                ) : (
                  <IconChevronRight className="exrow-arrow" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
