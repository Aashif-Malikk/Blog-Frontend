const API_BASE = 'https://blog-project-d6fu.onrender.com'
// const API_BASE = 'http://localhost:4000'


const PLACEHOLDER =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'

function resolveUploadsUrl(imgSrc) {
  if (API_BASE) return `${API_BASE}${imgSrc}`
  if (typeof window !== 'undefined' && imgSrc.startsWith('/uploads')) {
    return `${window.location.origin}${imgSrc}`
  }
  return imgSrc
}

/** Turn DB imgSrc into a loadable URL (server path, http, or placeholder for invalid blob URLs). */
export function resolveImageUrl(imgSrc) {
  if (!imgSrc || String(imgSrc).startsWith('blob:')) return PLACEHOLDER
  if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) return imgSrc
  if (imgSrc.startsWith('/uploads')) return resolveUploadsUrl(imgSrc)
  return imgSrc
}
