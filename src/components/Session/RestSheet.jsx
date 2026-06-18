// Descanso OPCIONAL: overlay con cuenta regresiva que se abre desde un botón.
// Autocontenido (no toca el estado de la sesión); el usuario lo cierra cuando quiere.
import { useState, useRef, useEffect } from 'react'

const OPTIONS = [60, 90, 120, 180]

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function RestSheet({ initial, onClose }) {
  const [duration, setDuration] = useState(initial)
  const endRef = useRef(Date.now() + initial * 1000)
  const [remaining, setRemaining] = useState(initial)

  useEffect(() => {
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000)))
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [duration])

  const pick = (d) => {
    setDuration(d)
    endRef.current = Date.now() + d * 1000
    setRemaining(d)
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="rest-label">Descanso</div>
        <div className="rest-count tnum">{fmt(remaining)}</div>
        <div className="rest-chips">
          {OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={`rest-chip tnum${duration === s ? ' rest-chip--on' : ''}`}
              onClick={() => pick(s)}
            >
              {s}s
            </button>
          ))}
        </div>
        <button type="button" className="btn btn--primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}
