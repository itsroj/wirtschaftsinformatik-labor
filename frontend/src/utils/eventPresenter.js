export function formatEventDate(dateString, lang = 'de') {
  if (!dateString) return ''

  const locale = lang === 'en' ? 'en-GB' : 'de-DE'

  return new Date(dateString).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}