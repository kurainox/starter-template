import { useCallback, useRef } from "react";
import Icon from "../Icon/Icon.component";
import styles from "./IconButton.module.css";

const IconButton = ({
  children,
  icon,
  name,
  iconColor,
  variant = "rounded",
  backgroundColor,
  textColor,
  splashColor,
  onClick,
  type = "button",
  form,
  disabled,
  classNames,
}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  const createRipple = useCallback(
    (e) => {
      if (disabled) return;

      if (rippleRef.current) {
        rippleRef.current.remove();
      }

      const button = buttonRef.current;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.setProperty("--ripple-size", `${size}px`);
      ripple.style.setProperty("--ripple-x", `${x}px`);
      ripple.style.setProperty("--ripple-y", `${y}px`);
      ripple.style.backgroundColor = splashColor;

      ripple.className = styles["ripple"];
      rippleRef.current = ripple;

      requestAnimationFrame(() => {
        button.appendChild(ripple);
      });

      const handleRippleEnd = () => {
        ripple.removeEventListener("animationend", handleRippleEnd);
        if (ripple.parentElement) {
          ripple.remove();
        }
      };

      ripple.addEventListener("animationend", handleRippleEnd);
      onClick && onClick(e);
    },
    [disabled, onClick]
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      form={form ? form : null}
      onClick={createRipple}
      disabled={disabled}
      className={`
        ${styles["elevated-button"]}
        ${variant === "rounded" ? styles["rounded"] : ""}
        ${variant === "pill" ? styles["pill"] : ""}
        ${icon ? styles["withIcon"] : ""}
        ${classNames}
    `}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <Icon name={name} color={iconColor} />
    </button>
  );
};

export default IconButton;
