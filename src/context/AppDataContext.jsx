// Estado global persistido: configuración del usuario + historial de sesiones +
// ediciones de rutina. Todo en localStorage, con sincronización opcional en la
// nube (Supabase) bajo un "código" elegido por el usuario.

import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../lib/storage'
import { mondayOf, toDateKey } from '../lib/dates'
import { isSupabaseConfigured } from '../lib/supabase'
import { fetchState, saveState } from '../lib/sync'

const AppDataContext = createContext(null)

// Config por defecto en el primer uso: la fecha de inicio = LUNES de la semana actual.
function defaultConfig() {
  return {
    startDate: toDateKey(mondayOf(new Date())),
    userName: '',
    restMain: 90,
    restAccessory: 60,
  }
}

export function AppDataProvider({ children }) {
  const [config, setConfig, patchConfig] = useLocalStorage(STORAGE_KEYS.config, defaultConfig)
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, [])
  const [routineOverrides, setRoutineOverrides] = useLocalStorage(
    STORAGE_KEYS.routineOverrides,
    {},
  )
  const [syncCode, setSyncCode] = useLocalStorage(STORAGE_KEYS.syncCode, '')
  const [syncStatus, setSyncStatus] = useState('idle') // idle|syncing|synced|error|no-table

  const lastSyncedJSON = useRef(null)
  const pushTimer = useRef(null)

  const addSession = useCallback(
    (session) => setHistory((prev) => [session, ...prev]),
    [setHistory],
  )

  const setOverride = useCallback(
    (phaseId, dayId, index, patch) => {
      const key = `${phaseId}-${dayId}-${index}`
      setRoutineOverrides((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
    },
    [setRoutineOverrides],
  )

  const resetOverride = useCallback(
    (phaseId, dayId, index) => {
      const key = `${phaseId}-${dayId}-${index}`
      setRoutineOverrides((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    },
    [setRoutineOverrides],
  )

  // Vuelca datos de la nube al estado local.
  function adopt(data) {
    const next = {
      config: data.config || config,
      history: Array.isArray(data.history) ? data.history : [],
      routineOverrides: data.routineOverrides || {},
    }
    setConfig(next.config)
    setHistory(next.history)
    setRoutineOverrides(next.routineOverrides)
    lastSyncedJSON.current = JSON.stringify(next)
  }

  // Conectar/activar la sync con un código (desde Configuración).
  // Si el código ya tiene datos → los baja a este dispositivo; si no → sube los locales.
  const connectSync = useCallback(
    async (code) => {
      if (!isSupabaseConfigured) return { ok: false, reason: 'no-config' }
      setSyncStatus('syncing')
      const res = await fetchState(code)
      if (!res.ok) {
        setSyncStatus(res.reason === 'no-table' ? 'no-table' : 'error')
        return res
      }
      const cloud = res.row?.data
      const cloudHasData =
        cloud &&
        ((cloud.history && cloud.history.length) ||
          (cloud.routineOverrides && Object.keys(cloud.routineOverrides).length))

      if (cloudHasData) {
        adopt(cloud)
        localStorage.setItem(
          STORAGE_KEYS.syncTs,
          String(Date.parse(res.row.updated_at) || Date.now()),
        )
        setSyncCode(code)
        setSyncStatus('synced')
        return { ok: true, action: 'downloaded' }
      }
      const core = { config, history, routineOverrides }
      const s = await saveState(code, core)
      if (!s.ok) {
        setSyncStatus(s.reason === 'no-table' ? 'no-table' : 'error')
        return s
      }
      lastSyncedJSON.current = JSON.stringify(core)
      localStorage.setItem(STORAGE_KEYS.syncTs, String(Date.now()))
      setSyncCode(code)
      setSyncStatus('synced')
      return { ok: true, action: 'uploaded' }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, history, routineOverrides, setSyncCode],
  )

  const disconnectSync = useCallback(() => {
    setSyncCode('')
    setSyncStatus('idle')
  }, [setSyncCode])

  // Al abrir: si hay código, traer de la nube y resolver por fecha (last-write-wins).
  useEffect(() => {
    if (!syncCode || !isSupabaseConfigured) return
    const localCore = { config, history, routineOverrides }
    if (lastSyncedJSON.current === null) lastSyncedJSON.current = JSON.stringify(localCore)
    let cancelled = false
    ;(async () => {
      setSyncStatus('syncing')
      const res = await fetchState(syncCode)
      if (cancelled) return
      if (!res.ok) {
        setSyncStatus(res.reason === 'no-table' ? 'no-table' : 'error')
        return
      }
      if (!res.row) {
        const s = await saveState(syncCode, localCore)
        if (!cancelled && s.ok) {
          lastSyncedJSON.current = JSON.stringify(localCore)
          localStorage.setItem(STORAGE_KEYS.syncTs, String(Date.now()))
          setSyncStatus('synced')
        }
        return
      }
      const cloudTs = Date.parse(res.row.updated_at) || 0
      const localTs = Number(localStorage.getItem(STORAGE_KEYS.syncTs) || 0)
      if (cloudTs >= localTs) {
        adopt(res.row.data || {})
        localStorage.setItem(STORAGE_KEYS.syncTs, String(cloudTs))
        setSyncStatus('synced')
      } else {
        const s = await saveState(syncCode, localCore)
        if (s.ok) lastSyncedJSON.current = JSON.stringify(localCore)
        setSyncStatus(s.ok ? 'synced' : 'error')
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push automático (debounced) cuando cambia el estado local y hay código.
  useEffect(() => {
    if (!syncCode || !isSupabaseConfigured) return
    const core = { config, history, routineOverrides }
    const json = JSON.stringify(core)
    if (lastSyncedJSON.current === null) {
      lastSyncedJSON.current = json
      return
    }
    if (json === lastSyncedJSON.current) return
    localStorage.setItem(STORAGE_KEYS.syncTs, String(Date.now()))
    setSyncStatus('syncing')
    clearTimeout(pushTimer.current)
    pushTimer.current = setTimeout(async () => {
      const res = await saveState(syncCode, core)
      if (res.ok) {
        lastSyncedJSON.current = json
        setSyncStatus('synced')
      } else {
        setSyncStatus(res.reason === 'no-table' ? 'no-table' : 'error')
      }
    }, 1200)
    return () => clearTimeout(pushTimer.current)
  }, [config, history, routineOverrides, syncCode])

  const value = {
    config,
    setConfig,
    patchConfig,
    history,
    setHistory,
    addSession,
    routineOverrides,
    setOverride,
    resetOverride,
    syncAvailable: isSupabaseConfigured,
    syncCode,
    syncStatus,
    connectSync,
    disconnectSync,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) {
    throw new Error('useAppData debe usarse dentro de <AppDataProvider>')
  }
  return ctx
}
