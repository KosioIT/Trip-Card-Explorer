export default function SearchAndSort({ query, onQueryChange, sortDesc, onToggleSort }) {
  return (
    <div className="controls">
      <input
        type="search"
        placeholder="Search by name…"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      <button className="btn" onClick={onToggleSort} aria-pressed={sortDesc}>
        Sort by rating: <strong>{sortDesc ? 'High → Low' : 'Low → High'}</strong>
      </button>
    </div>
  )
}
