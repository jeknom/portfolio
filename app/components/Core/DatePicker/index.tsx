import { FC, ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./datePicker.module.css";

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  required?: boolean;
  disabled?: boolean;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  disabled,
  required = true,
}) => {
  const date = value ? new Date(value) : new Date();
  const dateString = date.toISOString().split("T")[0];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const date = value === "" ? new Date() : new Date(value);

    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="fullWidth">
      {label && (
        <p
          className={classNames(
            "secondaryText",
            disabled && styles.disabledInput
          )}
        >
          {label}
        </p>
      )}
      <input
        className={classNames(
          "fullWidth",
          styles.input,
          disabled && styles.disabledInput
        )}
        type="date"
        value={dateString}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePicker;
