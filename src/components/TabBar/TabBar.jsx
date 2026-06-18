import { IconToday, IconHistory, IconRoutine, IconMore } from '../icons'

const TABS = [
  { id: 'today', label: 'Hoy', Icon: IconToday },
  { id: 'history', label: 'Historial', Icon: IconHistory },
  { id: 'routine', label: 'Rutina', Icon: IconRoutine },
  { id: 'more', label: 'Más', Icon: IconMore },
]

export function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className="tab"
          aria-current={active === id ? 'page' : undefined}
          aria-label={label}
          onClick={() => onChange(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
