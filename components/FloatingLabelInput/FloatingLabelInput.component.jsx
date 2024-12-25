// components/FloatingLabelInput.js
import Icon from "../Icon/Icon.component";
import styles from "./FloatingLabelInput.module.css";

const FloatingLabelInput = ({
  label,
  defaultValue,
  value,
  onChange,
  type = "text",
  id,
  icon = null,
  iconAction,
  spinner = false,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {type === "textarea" ? (
        <>
          <textarea
            id={id}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            className={`${styles.input} ${styles.textarea} ${
              error ? styles.error : ""
            }`}
            placeholder=""
            {...props}
          />
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        </>
      ) : (
        <>
          <span className={`${styles["inputWrapper"]}`}>
            <input
              type={type}
              id={id}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              className={`${styles.input} ${error ? styles.error : ""}`}
              placeholder=""
              {...props}
            />
            {spinner && (
              <Icon
                name="progress_activity"
                className={`${styles["rotate"]}`}
              />
            )}
            {icon && <Icon name={icon} size={24} iconAction={iconAction} />}
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          </span>
        </>
      )}
      {/* {!icon && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )} */}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FloatingLabelInput;
