import { useEffect, useState } from 'react'

export default function useTrips(url) {
  const [trips, setTrips] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('Network response was not ok'); return r.json() })
      .then(data => {
        if (cancelled) return
        const items = Array.isArray(data) ? data : data.trips
        setTrips(items || [])
        setError(null)
      })
      .catch(err => { if (!cancelled) { setError(err); setTrips([]) } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [url])

  return { trips, loading, error }
}
