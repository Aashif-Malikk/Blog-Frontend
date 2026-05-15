import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    name: 'Nature',
    count: 1245,
    icon: 'bi-tree',
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Travel',
    count: 982,
    icon: 'bi-airplane',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Architecture',
    count: 756,
    icon: 'bi-building',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'People',
    count: 1102,
    icon: 'bi-people',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Street',
    count: 640,
    icon: 'bi-signpost-split',
    image:
    'https://images.unsplash.com/photo-1546636889-ba9fdd63583e?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Animals',
    count: 889,
    icon: 'bi-heart',
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80',
  },
]

function Categories() {
  return (
    <section className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3 mb-4">
        <h2 className="h3 fw-bold mb-0 text-black">Explore Popular Categories</h2>
        <Link to="/categories" className="fw-semibold text-decoration-none pp-link-muted">
          View all categories
        </Link>
      </div>

      <div className="row g-4">
        {CATEGORIES.map((c) => (
          <div key={c.name} className="col-6 col-sm-6 col-lg-4 col-xl-2">
            <Link
              to={`/categories/${c.name.toLowerCase()}`}
              className="text-decoration-none text-white d-block h-100"
            >
              <div className="category-zoom shadow-sm hover-lift h-100">
                <div
                  className="category-bg position-relative rounded-4 ratio ratio-4x3 d-flex flex-column align-items-center justify-content-end text-center px-3 pb-4"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.88) 100%), url(${c.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="position-absolute top-0 start-50 translate-middle-x mt-4">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 border border-white border-opacity-25 p-3">
                      <i className={`bi ${c.icon} fs-5 mx-1`} aria-hidden />
                    </span>
                  </div>
                  <div className="position-relative">
                    <h3 className="h5 fw-bold mb-1">{c.name}</h3>
                    <p className="small text-white-50 mb-0">{c.count.toLocaleString()} Photos</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Categories2() {
  return (
    <div className='p-4'>
      <section className="py-xl-5">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3 mb-4">
          <h2 className="h3 fw-bold mb-0 text-black">Explore Popular Categories</h2>
        </div>

        <div className="row g-4">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <Link
                to={`/categories/${c.name.toLowerCase()}`}
                className="text-decoration-none text-white d-block h-100"
              >
                <div className="category-zoom shadow-sm hover-lift h-100">
                  <div
                    className="category-bg position-relative rounded-4 ratio ratio-4x3 d-flex flex-column align-items-center justify-content-end text-center px-3 py-4"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.88) 100%), url(${c.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="position-absolute top-50 start-50 translate-middle-x mt-4">
                      <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 border border-white border-opacity-25 p-3">
                        <i className={`bi ${c.icon} fs-5 mx-1`} aria-hidden />
                      </span>
                    </div>
                    <div className="position-relative">
                      <h3 className="h5 fw-bold mb-1">{c.name}</h3>
                      <p className="small text-white-50 mb-0">{c.count.toLocaleString()} Photos</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Categories

