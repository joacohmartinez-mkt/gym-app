import { useState, useEffect, useCallback } from 'react'

// Estado persistido en localStorage. Acepta un valor inicial o una función
// (para defaults que dependen de la fecha actual). API tipo useState.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw != null) return JSON.parse(raw)
    } catch {
      // valor corrupto → caemos al default
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // sin espacio o sin acceso a localStorage: no rompemos la app
    }
  }, [key, value])

  // Merge parcial cómodo para objetos de configuración.
  const patch = useCallback((partial) => {
    setValue((prev) => ({ ...prev, ...partial }))
  }, [])

  return [value, setValue, patch]
}
