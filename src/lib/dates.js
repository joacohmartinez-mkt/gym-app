// Helpers de fecha sobre date-fns. Trabajamos con "date keys" (yyyy-MM-dd) en
// hora local para evitar problemas de zona horaria al comparar días.

import {
  format,
  parseISO,
  startOfWeek,
  differenceInCalendarWeeks,
  isSameDay,
} from 'date-fns'
import { es } from 'date-fns/locale'

export function toDateKey(date) {
  return format(date, 'yyyy-MM-dd')
}

export function parseDateKey(key) {
  // 'yyyy-MM-dd' → Date local a medianoche
  return parseISO(`${key}T00:00:00`)
}

// Lunes de la semana de la fecha dada (semana arranca lunes).
export function mondayOf(date) {
  return startOfWeek(date, { weekStartsOn: 1 })
}

// Cuántas semanas (de lunes a lunes) pasaron desde `start` hasta `date`.
export function weeksSince(start, date) {
  return differenceInCalendarWeeks(date, start, { weekStartsOn: 1 })
}

// Fecha legible en español, ej: "martes 16 de junio".
export function formatLong(date) {
  return format(date, "EEEE d 'de' MMMM", { locale: es })
}

// Fecha corta, ej: "16 jun".
export function formatShort(date) {
  return format(date, "d MMM", { locale: es })
}

export { isSameDay }
