// Biblioteca de ejercicios: lista con miniatura → detalle con imágenes de
// referencia A (inicio) y B (fin), músculos, ejecución, por qué es seguro para
// L5-S1 y error común.
import { useState, useRef, useEffect } from 'react'
import { EXERCISES } from '../../data/exercises'
import { EXERCISE_MEDIA } from '../../data/exerciseLibrary'
import { IconChevronLeft, IconChevronRight, IconBook } from '../icons'

const LIST = Object.values(EXERCISES)

function merged(exId) {
  return { ...EXERCISES[exId], ...(EXERCISE_MEDIA[exId] || {}) }
}

// Miniatura (imagen A) para la lista.
function Thumb({ image, name }) {
  if (!image) {
    return (
      <div className="eximg eximg--empty eximg--thumb">
        <IconBook />
      </div>
    )
  }
  return <img className="eximg eximg--thumb" src={image} alt={name} loading="lazy" />
}

function Detail({ exId, onBack }) {
  const ex = merged(exId)
  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Biblioteca
      </button>

      {ex.imageA ? (
        <div className="ab-grid">
          <figure className="ab-item">
            <img className="eximg eximg--ab" src={ex.imageA} alt={`${ex.name} — inicio`} loading="lazy" />
            <figcaption className="ab-cap">Inicio</figcaption>
          </figure>
          <figure className="ab-item">
            <img className="eximg eximg--ab" src={ex.imageB} alt={`${ex.name} — fin`} loading="lazy" />
            <figcaption className="ab-cap">Fin</figcaption>
          </figure>
        </div>
      ) : (
        <div className="eximg eximg--empty eximg--big">
          <IconBook />
          <span>Imagen próximamente</span>
        </div>
      )}

      <h2 className="detail-title" style={{ marginTop: 'var(--s-4)' }}>{ex.name}</h2>
      <p className="detail-sub">
        {ex.primary}
        {ex.secondary ? ` · ${ex.secondary}` : ''}
      </p>

      <div className="lib-section">
        <div className="info-section-title">Ejecución</div>
        <p className="info-text">{ex.execution}</p>
      </div>
      <div className="lib-section">
        <div className="info-section-title">Por qué es seguro para L5-S1</div>
        <p className="info-text">{ex.whyL5S1}</p>
      </div>
      {ex.commonError ? (
        <div className="lib-section">
          <div className="info-section-title">Error más común</div>
          <p className="info-text">{ex.commonError}</p>
        </div>
      ) : null}
    </div>
  )
}

export function ExerciseLibraryScreen({ onBack }) {
  const [exId, setExId] = useState(null)
  const listScroll = useRef(0)

  // Conserva la posición de scroll: al detalle va arriba; al volver, restaura.
  useEffect(() => {
    if (exId) window.scrollTo(0, 0)
    else window.scrollTo(0, listScroll.current)
  }, [exId])

  const openDetail = (id) => {
    listScroll.current = window.scrollY
    setExId(id)
  }

  if (exId) return <Detail exId={exId} onBack={() => setExId(null)} />

  return (
    <div className="screen">
      <button type="button" className="backlink" onClick={onBack}>
        <IconChevronLeft />
        Más
      </button>
      <h2 className="detail-title" style={{ marginBottom: 'var(--s-4)' }}>Biblioteca</h2>

      <ul className="exlist-items">
        {LIST.map((base) => {
          const ex = merged(base.id)
          return (
            <li key={base.id}>
              <button type="button" className="lib-row" onClick={() => openDetail(base.id)}>
                <Thumb image={ex.imageA} name={ex.name} />
                <span className="exrow-main">
                  <span className="exrow-name">{ex.name}</span>
                  <span className="exrow-meta">{ex.primary}</span>
                </span>
                <IconChevronRight className="exrow-arrow" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
