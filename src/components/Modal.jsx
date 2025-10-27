import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose?.() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => { if (open) dialogRef.current?.focus() }, [open])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="modal"
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
      >
        <button className="icon-btn close" onClick={onClose} aria-label="Close">×</button>
        <h3 className="modal-title">{title}</h3>
        {children}
      </div>
    </div>
  )
}
