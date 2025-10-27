export default function TripCard({ trip, onMore }) {
  const { name, image, description, rating } = trip
  const stars = '★★★★★☆☆☆☆☆'.slice(5 - rating, 10 - rating)
  return (
    <article className="card">
      <div className="image-wrap">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="rating" aria-label={`Rating: ${rating} out of 5`}>
          {stars}<span className="rating-num">{rating}/5</span>
        </div>
        <p className="desc">{description}</p>
        <div className="actions">
          <button className="btn primary" onClick={onMore}>More info</button>
        </div>
      </div>
    </article>
  )
}
