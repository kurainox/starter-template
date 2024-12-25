import styles from "./divider.module.css";
export default function Divider({
  text,
  orientation = "horizontal", // horizontal or vertical
  variant = "solid", // solid, dashed, dotted
  className = "",
  color = "#e5e5e5",
  spacing = "0.5rem",
  textPosition = "center", // left, center, right
}) {
  if (text) {
    return (
      <div
        className={`${styles.dividerWithText} ${styles[orientation]} ${
          styles[`text-${textPosition}`]
        } ${className}`}
        style={{ "--divider-color": color, "--divider-spacing": spacing }}
      >
        <span className={styles.text}>{text}</span>
      </div>
    );
  }

  return (
    <hr
      className={`${styles.divider} ${styles[orientation]} ${styles[variant]} ${className}`}
      style={{ "--divider-color": color, "--divider-spacing": spacing }}
    />
  );
}
