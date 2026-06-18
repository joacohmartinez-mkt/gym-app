// Configuración: nombre, fecha de inicio, descansos y sincronización en la nube.
import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { IconChevronLeft } from '../icons'

const REST_OPTIONS = [60, 90, 120, 180]

const STATUS_TEXT = {
  syncing: 'Guardando…',
  synced: 'Al día ✓',
  error: 'Error de conexión',
  'no-table': 'Falta crear la tabla en Supabase (corré el SQL una vez)',
  idle: '',
}

function SyncSection() {
  const { syncAvailable, syncCode, syncStatus, connectSync, disconnectSync } = useAppData()
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  if (!syncAvailable) return null

  const connect = async () => {
    const c = code.trim()
    if (!c) return
    setBusy(true)
    setMsg('')
    const res = await connectSync(c)
    setBusy(false)
    if (res.ok) {
      setMsg(
        res.action === 'downloaded'
          ? 'Listo: traje los datos de la nube a este dispositivo.'
          : 'Listo: subí los datos de este dispositivo a la nube.',
      )
    } else if (res.reason === 'no-table') {
      setMsg('Falta crear la tabla en Supabase. Corré el SQL de supabase-setup.sql una vez.')
    } else if (res.reason === 'no-config') {
      setMsg('Supabase no está configurado.')
    } else {
      setMsg('No pude conectar. Revisá tu internet e intentá de nuevo.')
    }
  }

  return (
    <>
      <div className="plan-title" style={{ marginTop: 'var(--s-6)' }}>
        Sincronización entre dispositivos
      </div>

      {syncCode ? (
        <div className="card">
          <div className="done-head">
            <span className="badge badge--done">Sincronizado</span>
          </div>
          <p style={{ color: 'var(--text)', margin: '4px 0' }}>
            Código: <strong className="tnum">{syncCode}</strong>
          </p>
          <p className="cta-sub" style={{ textAlign: 'left', marginTop: 0 }}>
            {STATUS_TEXT[syncStatus] || ''}
          </p>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={disconnectSync}
            style={{ marginTop: 'var(--s-3)' }}
          >
            Desconectar este dispositivo
          </button>
        </div>
      ) : (
        <>
          <p className="cta-sub" style={{ textAlign: 'left' }}>
            Elegí un código (una palabra o PIN tuyo) y ponelo igual en el celu y en la
            compu. Tus datos se comparten por ese código.
          </p>
          <label className="field field--block" style={{ marginTop: 'var(--s-3)' }}>
            <span>Código de sincronización</span>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ej: joaco-gym-2026"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </label>
          <button
            type="button"
            className="btn btn--cta"
            disabled={busy || !code.trim()}
            onClick={connect}
            style={{ marginTop: 'var(--s-3)' }}
          >
            {busy ? 'Conectando…' : 'Conectar'}
          </button>
          {msg ? (
            <p className="cta-sub" style={{ textAlign: 'left' }}>
              {msg}
            </p>
          ) : null}
        </>
      )}
    </>
  )
}

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

      <SyncSection />
    </div>
  )
}
