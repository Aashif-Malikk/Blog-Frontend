import { Link } from 'react-router-dom'
import Categories from '../Categories/Categories'
import RecentlyAddedPhotos from '../ImageCard/ImageCard'

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80'

const FEATURES = [
  {
    icon: 'bi-cloud-arrow-up',
    title: 'Upload Your Photos',
    text: 'Showcase your best work in a storefront built for visual storytelling.',
  },
  {
    icon: 'bi-currency-dollar',
    title: 'Set Your Price',
    text: 'Choose licensing and pricing that fits your creative business.',
  },
  {
    icon: 'bi-people',
    title: 'Get More Exposure',
    text: 'Reach collectors and brands browsing curated, high-quality imagery.',
  },
]

function Home() {

  return (
    <main>
      <section
        className="hero-wrap text-white position-relative overflow-hidden mb-5"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="hero-overlay w-100 h-100">
          <div className="container py-4 py-lg-5">
            <div className="row align-items-center py-5">
              <div className="col-lg-7 text-center text-lg-start">
                <span className="badge rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 px-3 py-2 mb-3 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-stars" aria-hidden />
                  Share Your Vision. Inspire The World.
                </span>
                <h1 className="display-3 fw-bold lh-sm">Upload, Sell &amp; Get Seen.</h1>
                <p
                  className="lead text-white-50 mt-3 mb-4 mx-auto mx-lg-0"
                  style={{ maxWidth: 520 }}
                >
                  A platform for photographers and creators to upload, sell and share stunning images
                  with the world.
                </p>
                <div className="d-grid gap-3 d-md-flex justify-content-center justify-content-lg-start">
                  <Link to='/sell'>
                    <button
                      type="button"
                      className="btn btn-pp btn-lg px-4 d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-upload" aria-hidden />
                      Start Selling
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-light btn-lg px-4 text-dark d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="bi bi-compass" aria-hidden />
                    Explore Photos
                  </button>
                </div>
              </div>
            </div>

            <div className="row glass-row rounded-4 d-lg-flex justify-content-center align-items-center p-4 p-lg-4 g-4 mb-2 mb-lg-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="col-12 col-md-4 m-0">
                  <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3">
                    <div className="rounded-circle bg-white bg-opacity-10 p-3 border border-white border-opacity-10">
                      <i className={`bi ${f.icon} fs-4 m-1`} aria-hidden />
                    </div>
                    <div>
                      <h3 className="h5 fw-bold mb-1">{f.title}</h3>
                      <p className="small text-white-50 mb-0">{f.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-2 py-lg-4">
        <Categories />
        <RecentlyAddedPhotos />
      </div>
    </main>
  )
}

export default Home
