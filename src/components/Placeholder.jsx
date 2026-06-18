// Pantalla provisoria para los tabs que todavía no se construyeron.
export function Placeholder({ title, Icon, children }) {
  return (
    <div className="screen">
      <div className="placeholder">
        {Icon && <Icon />}
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}
