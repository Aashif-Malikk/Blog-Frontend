const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'

/** Turn DB imgSrc into a loadable URL (server path, http, or placeholder for invalid blob URLs). */
export function resolveImageUrl(imgSrc) {
  if (!imgSrc || String(imgSrc).startsWith('blob:')) return PLACEHOLDER
  if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) return imgSrc
  if (imgSrc.startsWith('/uploads')) return `${API_BASE}${imgSrc}`
  return imgSrc
}
