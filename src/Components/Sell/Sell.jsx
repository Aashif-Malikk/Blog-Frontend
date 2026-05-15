import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')


const TIPS = [
  'Upload high-resolution images',
  'Use the right category',
  'Add accurate title & description',
  'Set a fair price for better reach',
]

const WHY_SELL = [
  {
    icon: 'bi-currency-dollar',
    title: 'Earn Money',
    text: 'Set your price and earn with every sale.',
  },
  {
    icon: 'bi-globe2',
    title: 'Global Exposure',
    text: 'Get your photos in front of thousands of buyers.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Secure & Easy',
    text: 'We handle payments and security for you.',
  },
  {
    icon: 'bi-headset',
    title: 'Creator Support',
    text: 'Our team is here to help you succeed.',
  },
]

const PREVIEW_PLACEHOLDER =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'

function Sell() {
  const fileRef = useRef(null)
  const blobUrlRef = useRef(null)
  const [title, setTitle] = useState('')
  const [price, setprice] = useState('')
  const [sellUplaodClass, setsellUplaodClass] = useState('sell-upload-zone rounded-4 bg-white d-flex flex-column flex-md-row align-items-center justify-content-center text-center p-4 p-md-5 mb-4')
  const [responseMsg, setresponseMsg] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSrc, setPreviewSrc] = useState(PREVIEW_PLACEHOLDER)
  const [fileMeta, setFileMeta] = useState({
    name: 'No file selected',
    size: '—',
    dimensions: '—',
  })

  const submitSellDetails = async (e) => {
    e.preventDefault()
    if (!API_BASE) {
      setresponseMsg('Missing VITE_API_URL in Blog_Frontend/.env — restart dev server.')
      return
    }
    if (!selectedFile) {
      setresponseMsg('Please choose an image file to upload.')
      return
    }
    if (!title.trim()) {
      setresponseMsg('Title is required.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('title', title.trim())
    formData.append('description', description)
    formData.append('tags', tags)
    formData.append('price', price)
    formData.append('fileMeta', JSON.stringify(fileMeta))

    const token = localStorage.getItem('token')
    if (!token) {
      setresponseMsg('You must be logged in to upload images.')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/sell`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setresponseMsg(data.error || data.msg || `Request failed (${res.status})`)
        return
      }
      setresponseMsg(data.msg ?? 'Saved.')
    } catch (err) {
      setresponseMsg(err.message || 'Network error')
    }
  }

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
    }
  }, [])

  const onFileChange = function (e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
    const url = URL.createObjectURL(file)
    blobUrlRef.current = url
    setSelectedFile(file)
    setFileMeta({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      dimensions: 'Auto-detected on upload',
    })
    setPreviewSrc(url)
    setsellUplaodClass(`sell-upload-zone rounded-4 bg-white d-xl-flex d-none flex-column flex-md-row align-items-center justify-content-center text-center p-4 p-md-5 mb-4`)
  }

  return (
    <main className="sell-page py-4 py-lg-5">
      <div className="container-fluid px-3 px-lg-4" style={{ maxWidth: 1320 }}>
        <div className="row g-4">
          {/* Left: stepper + tips */}
          <aside className="col-12 col-lg-3 order-3 order-lg-1">
            <div className="d-flex flex-column gap-4">

              <div className="bg-light rounded-4 border border-light p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span
                    className="d-inline-flex rounded-circle p-2"
                    style={{ background: 'rgba(124, 77, 255, 0.15)' }}
                  >
                    <i className="bi bi-lightbulb" style={{ color: '#7C4DFF' }} />
                  </span>
                  <h3 className="h6 fw-bold mb-0">Uploading Tips</h3>
                </div>
                <ul className="list-unstyled small text-muted mb-3 d-flex flex-column gap-2">
                  {TIPS.map((tip) => (
                    <li key={tip} className="d-flex gap-2">
                      <i className="bi bi-check2 text-success flex-shrink-0 mt-1" aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/guidelines"
                  className="small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 pp-link-muted"
                >
                  View guidelines
                  <i className="bi bi-arrow-right" aria-hidden />
                </Link>
              </div>
            </div>
          </aside>

          {/* Center: upload + form */}
          <section className="col-12 col-lg-6 order-2 order-xl-1 order-lg-2">
            <header className="mb-4">
              <h1 className="h2 fw-bold mb-2">Upload Your Photo</h1>
              <p className="text-muted mb-0">
                Add your best work, complete the details, and get ready to sell on PixelPost.
              </p>
            </header>

            <div
              className={sellUplaodClass}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileRef.current?.click()
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                className="d-none"
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileChange}
              />
              <div>

                <button
                  type="button"
                  className="btn btn-pp rounded-pill px-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileRef.current?.click()
                  }}
                >
                  Choose File
                </button>
                <p className="small text-muted mt-3 mb-0">
                  JPEG, PNG, WEBP · Max 25MB · Min width 2000px recommended
                </p>
              </div>
            </div>

            <div className="bg-white rounded-4 sell-card p-4 p-lg-4 mb-4">
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="photo-title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    id="photo-title"
                    className="form-control rounded-3"
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Alpine sunrise over the ridge"
                  />
                  <div className="form-text text-end">{title.length}/100</div>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="photo-price" className="form-label fw-semibold">
                    Set Price
                  </label>
                  <input
                    id="photo-price"
                    className="form-control rounded-3"
                    maxLength={3}
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    placeholder="Multiple of 5"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="photo-desc" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    id="photo-desc"
                    className="form-control rounded-3"
                    rows={4}
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the mood, location, and what makes this shot special."
                  />
                  <div className="form-text text-end">{description.length}/500</div>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="photo-category" className="form-label fw-semibold">
                    Category
                  </label>
                  <select id="photo-category" className="form-select rounded-3" defaultValue="">
                    <option value="" disabled>
                      Select category
                    </option>
                    <option>Nature</option>
                    <option>Travel</option>
                    <option>Architecture</option>
                    <option>People</option>
                    <option>Street</option>
                    <option>Animals</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="photo-visibility" className="form-label fw-semibold">
                    Visibility
                  </label>
                  <select id="photo-visibility" className="form-select rounded-3" defaultValue="public">
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private draft</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="photo-tags" className="form-label fw-semibold">
                    Tags
                  </label>
                  <input
                    id="photo-tags"
                    className="form-control rounded-3"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags (e.g. nature, mountains, sunrise)"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
              <p className='small text-sucess'>{responseMsg}</p>
              <button onClick={submitSellDetails} type="button" className="btn btn-pp rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2 order-1 order-sm-2">
                Submit
                <i className="bi bi-arrow-right" aria-hidden />
              </button>
            </div>
          </section>

          {/* Right: preview + why sell */}
          <aside className="col-12 col-lg-3 order-1 order-xl-3 order-lg-3">
            <div className="d-flex flex-column gap-4">
              <div className="bg-white rounded-4 sell-card p-3 p-lg-4">
                <h3 className="h6 fw-bold mb-3">Photo Preview</h3>
                <div className="ratio ratio-4x3 rounded-3 overflow-hidden bg-light mb-3">
                  <img src={previewSrc} alt="" className="object-fit-cover w-100 h-100" />
                </div>
                <dl className="row small mb-0 g-2">
                  <dt className="col-5 text-muted fw-normal">File Name</dt>
                  <dd className="col-7 text-end text-break mb-0">{fileMeta.name}</dd>
                  <dt className="col-5 text-muted fw-normal">File Size</dt>
                  <dd className="col-7 text-end mb-0">{fileMeta.size}</dd>
                  <dt className="col-5 text-muted fw-normal">Dimensions</dt>
                  <dd className="col-7 text-end mb-0">{fileMeta.dimensions}</dd>
                </dl>
              </div>

              <div className="bg-white rounded-4 sell-card p-4">
                <h3 className="h6 fw-bold mb-3">Why sell your photos?</h3>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {WHY_SELL.map((item) => (
                    <li key={item.title} className="d-flex gap-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{
                          width: 40,
                          height: 40,
                          background: 'rgba(124, 77, 255, 0.12)',
                          color: '#7C4DFF',
                        }}
                      >
                        <i className={`bi ${item.icon}`} aria-hidden />
                      </span>
                      <div>
                        <div className="fw-semibold small">{item.title}</div>
                        <p className="small text-muted mb-0">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Sell
