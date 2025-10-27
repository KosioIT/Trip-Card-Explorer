import { useMemo, useState } from "react";
import SearchAndSort from "./components/SearchAndSort.jsx";
import TripCard from "./components/TripCard.jsx";
import Modal from "./components/Modal.jsx";
import useTrips from "./hooks/useTrips.js";
import "./styles/index.scss";

export default function App() {
  const { trips, loading, error } = useTrips("/data.json");
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const list = (trips || []).filter((t) =>
      t.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    list.sort((a, b) => (sortDesc ? b.rating - a.rating : a.rating - b.rating));
    return list;
  }, [trips, query, sortDesc]);

  return (
    <div className="container">
      <header className="header">
        <h1>Trip Card Explorer</h1>
        <p className="subtitle">Find your next quirky adventure</p>
      </header>

      <SearchAndSort
        query={query}
        onQueryChange={setQuery}
        sortDesc={sortDesc}
        onToggleSort={() => setSortDesc((v) => !v)}
      />

      {loading && <div className="status">Loading trips…</div>}
      {error && <div className="status error">Could not load trips.</div>}

      {!loading &&
        !error &&
        (filtered.length ? (
          <section className="grid" aria-label="Trips list">
            {filtered.map((t) => (
              <TripCard key={t.id} trip={t} onMore={() => setSelected(t)} />
            ))}
          </section>
        ) : (
          <div className="status">No trips match your search.</div>
        ))}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
      >
        {selected && (
          <div className="modal-body">
            <img
              className="modal-image"
              src={selected.image}
              alt={selected.name}
            />
            <div>
              <div
                className="rating"
                aria-label={`Rating: ${selected.rating} out of 5`}
              >
                {"★★★★★☆☆☆☆☆".slice(5 - selected.rating, 10 - selected.rating)}
                <span className="rating-num">{selected.rating}/5</span>
              </div>
              <p className="long">{selected.long_description}</p>
            </div>
          </div>
        )}
      </Modal>

      <footer className="footer">Built with React 19 + Vite 7 + SASS</footer>
    </div>
  );
}
