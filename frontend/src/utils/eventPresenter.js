/**
 * Formatiert ein ISO-Datumsstring als lesbares Datum in der übergebenen Sprache.
 * Beispiel: '2025-03-15' → '15. März 2025' (DE) / '15 March 2025' (EN)
 */
export function formatEventDate(dateString, lang = 'de') {
  if (!dateString) return ''

  const locale = lang === 'en' ? 'en-GB' : 'de-DE'

  return new Date(dateString).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}