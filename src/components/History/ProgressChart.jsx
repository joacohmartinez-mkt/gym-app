// Gráfico de progresión de peso (SVG propio, sin librerías). Una línea con el
// peso de la mejor serie por sesión, vieja → nueva.
import { formatShort } from '../../lib/dates'

export function ProgressChart({ series }) {
  if (!series || series.length === 0) return null

  const W = 320
  const H = 160
  const padX = 16
  const padTop = 20
  const padBottom = 26

  const weights = series.map((d) => d.weight)
  let min = Math.min(...weights)
  let max = Math.max(...weights)
  if (min === max) {
    min = Math.max(0, min - 5)
    max = max + 5
  }
  const n = series.length
  const xAt = (i) => (n === 1 ? W / 2 : padX + (i * (W - 2 * padX)) / (n - 1))
  const yAt = (w) => padTop + (1 - (w - min) / (max - min)) * (H - padTop - padBottom)
  const points = series.map((d, i) => `${xAt(i)},${yAt(d.weight)}`).join(' ')

  const first = new Date(series[0].date)
  const last = new Date(series[n - 1].date)

  return (
    <div className="progress-chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Progresión de peso: de ${weights[0]} a ${weights[n - 1]} kg en ${n} sesiones`}
      >
        <line className="pc-axis" x1={padX} y1={H - padBottom} x2={W - padX} y2={H - padBottom} />

        {n > 1 && <polyline className="pc-line" fill="none" points={points} />}

        {series.map((d, i) => (
          <circle
            key={i}
            className={i === n - 1 ? 'pc-dot pc-dot--last' : 'pc-dot'}
            cx={xAt(i)}
            cy={yAt(d.weight)}
            r={i === n - 1 ? 5 : 3.5}
          />
        ))}

        <text className="pc-scale" x={padX} y={padTop - 6}>{Math.round(min)}–{Math.round(max)} kg</text>

        <text className="pc-date" x={padX} y={H - 8}>{formatShort(first)}</text>
        {n > 1 && (
          <text className="pc-date" textAnchor="end" x={W - padX} y={H - 8}>
            {formatShort(last)}
          </text>
        )}
      </svg>
    </div>
  )
}
