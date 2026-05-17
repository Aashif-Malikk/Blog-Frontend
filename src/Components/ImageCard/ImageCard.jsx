import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveImageUrl } from '../../utils/imageUrl'

const API_BASE = 'https://blog-project-d6fu.onrender.com'
// const API_BASE = 'http://localhost:4000'

export function ImageCard({ title, description, price, imgSrc }) {
  const imageUrl = resolveImageUrl(imgSrc)

  return (
    <article className="card image-card border-0 shadow-sm rounded-4 overflow-hidden hover-lift h-auto">
      <div className="image-card-media rounded-top-4 overflow-hidden">
        <img src={imageUrl} alt={title || ''} className="image-card-img" loading="lazy" />

        <div className="card-body image-card-body position-absolute bottom-0 start-0 end-0 d-flex flex-column justify-content-end p-4">
          <div className="image-card-details">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
              <h3 className="h5 fw-bold mb-0">{title}</h3>
              <span className="fw-bold fs-5 flex-shrink-0 text-primary">
                ${price}
              </span>
            </div>
            <p className="text-secondary small mb-0 text-dark">{description}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function RecentlyAddedPhotos() {
  const [imgData, setimgData] = useState(null)
  const [loadError, setLoadError] = useState(() =>
    API_BASE ? '' : 'Missing VITE_API_URL'
  )

  useEffect(() => {
    if (!API_BASE) return undefined

    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/sell`)
        const data = await res.json()
        if (cancelled) return
        if (!res.ok) {
          setLoadError(data.msg || 'Failed to load photos')
          setimgData([])
          return
        }
        setimgData(Array.isArray(data) ? data : [])
        setLoadError('')
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || 'Network error')
          setimgData([])
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="py-5">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3 mb-3">
        <h2 className="h3 fw-bold mb-0">Recently Added Photos</h2>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 justify-content-between w-100 w-lg-auto">
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-pp btn-sm rounded-pill px-3">
              Latest
            </button>
            <button type="button" className="btn btn-light btn-sm rounded-pill px-3 border">
              Popular
            </button>
            <button type="button" className="btn btn-light btn-sm rounded-pill px-3 border">
              Most Viewed
            </button>
          </div>
          <Link to="/photos" className="fw-semibold text-decoration-none pp-link-muted text-nowrap">
            View all photos
          </Link>
        </div>
      </div>

      {loadError && <p className="text-danger small">{loadError}</p>}

      <div className="row g-4">
        {Array.isArray(imgData) &&
          imgData.map((p) => (
            <div key={p._id} className="col-6 col-sm-6 col-lg-3">
              <ImageCard
                title={p.title}
                description={p.description}
                price={p.price}
                imgSrc={p.imgSrc}
              />
            </div>
          ))}
      </div>
    </section>
  )
}
