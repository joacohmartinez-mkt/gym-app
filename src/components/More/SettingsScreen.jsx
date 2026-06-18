// Configuración: nombre, fecha de inicio del programa y descansos por defecto.
import { useAppData } from '../../context/AppDataContext'
import { IconChevronLeft } from '../icons'

const REST_OPTIONS = [60, 90, 120, 180]

export function SettingsScreen({ onBack }) {
  const { config, patchConfig } = useAppData()

  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Más
      </button>
      <h2 className="detail-title" style={{ marginBottom: 'var(--s-5)' }}>Configuración</h2>

      <label className="field field--block">
        <span>Nombre</span>
        <input
          type="text"
          value={config.userName}
          onChange={(e) => patchConfig({ userName: e.target.value })}
          placeholder="Tu nombre"
        />
      </label>

      <label className="field field--block" style={{ marginTop: 'var(--s-5)' }}>
        <span>Fecha de inicio del programa</span>
        <input
          type="date"
          value={config.startDate}
          onChange={(e) => e.target.value && patchConfig({ startDate: e.target.value })}
        />
      </label>
      <p className="cta-sub" style={{ textAlign: 'left', marginTop: 6 }}>
        Define en qué semana del programa estás hoy.
      </p>

      <div className="plan-title" style={{ marginTop: 'var(--s-6)' }}>
        Descanso · ejercicios principales
      </div>
      <div className="seg-row">
        {REST_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={`seg tnum${config.restMain === s ? ' seg--on' : ''}`}
            onClick={() => patchConfig({ restMain: s })}
          >
            {s}s
          </button>
        ))}
      </div>

      <div className="plan-title" style={{ marginTop: 'var(--s-5)' }}>
        Descanso · accesorios
      </div>
      <div className="seg-row">
        {REST_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={`seg tnum${config.restAccessory === s ? ' seg--on' : ''}`}
            onClick={() => patchConfig({ restAccessory: s })}
          >
            {s}s
          </button>
        ))}
      </div>
    </div>
  )
}
