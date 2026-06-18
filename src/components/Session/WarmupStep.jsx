// Paso 1: calentamiento. Lista con checkboxes; no se puede saltear la pantalla,
// solo avanzar con el botón.
import { IconCheck } from '../icons'

export function WarmupStep({ warmup, checked, onToggle, onContinue }) {
  return (
    <div className="warmup">
      <h2 className="step-heading">Calentamiento</h2>
      <p className="step-sub">Obligatorio. Tachá lo que vayas haciendo.</p>

      <ul className="warmup-list">
        {warmup.map((item) => {
          const isOn = !!checked[item.id]
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`warmup-item${isOn ? ' warmup-item--on' : ''}`}
                onClick={() => onToggle(item.id)}
                aria-pressed={isOn}
              >
                <span className="warmup-box">{isOn ? <IconCheck /> : null}</span>
                <span className="warmup-label">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <button type="button" className="btn btn--cta" onClick={onContinue}>
        Listo, empezar ejercicios
      </button>
    </div>
  )
}
