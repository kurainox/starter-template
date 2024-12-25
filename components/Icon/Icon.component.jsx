export default function Icon({
  name,
  filled = false,
  weight = 400,
  size = 24,
  className = "",
  padding,
  margin,
  color,
  iconAction,
}) {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        fontVariationSettings: `
            "FILL" ${filled ? 1 : 0},
            "wght" ${weight},
            "GRAD" ${0},
            "opsz" ${size},
        `,
        fontSize: size,
        padding: padding || 0,
        margin: margin || 0,
        color: color || "var(--md-sys-color-secondary)",
        cursor: iconAction ? "pointer" : "inherit",
      }}
      onClick={iconAction}
    >
      {name}
    </span>
  );
}
