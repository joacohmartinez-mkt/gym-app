// Tab MÁS — menú a las secciones secundarias.
import { useState } from 'react'
import {
  IconBook,
  IconNutrition,
  IconAlert,
  IconSettings,
  IconChevronRight,
} from '../icons'
import { ExerciseLibraryScreen } from './ExerciseLibraryScreen'
import { NutritionScreen } from './NutritionScreen'
import { RulesScreen } from './RulesScreen'
import { SettingsScreen } from './SettingsScreen'

const ITEMS = [
  { id: 'library', label: 'Biblioteca de ejercicios', desc: 'Fichas con imágenes y técnica', Icon: IconBook },
  { id: 'nutrition', label: 'Nutrición', desc: 'Objetivos diarios y timing', Icon: IconNutrition },
  { id: 'rules', label: 'Reglas y alertas', desc: 'Qué hacer y señales de alarma', Icon: IconAlert },
  { id: 'settings', label: 'Configuración', desc: 'Inicio, descansos y nombre', Icon: IconSettings },
]

export function MoreScreen() {
  const [view, setView] = useState('menu')
  const back = () => setView('menu')

  if (view === 'library') return <ExerciseLibraryScreen onBack={back} />
  if (view === 'nutrition') return <NutritionScreen onBack={back} />
  if (view === 'rules') return <RulesScreen onBack={back} />
  if (view === 'settings') return <SettingsScreen onBack={back} />

  return (
    <div className="screen">
      <p className="screen-title">Más</p>
      <ul className="exlist-items">
        {ITEMS.map(({ id, label, desc, Icon }) => (
          <li key={id}>
            <button type="button" className="menu-row" onClick={() => setView(id)}>
              <span className="menu-icon">
                <Icon />
              </span>
              <span className="exrow-main">
                <span className="exrow-name">{label}</span>
                <span className="exrow-meta">{desc}</span>
              </span>
              <IconChevronRight className="exrow-arrow" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
