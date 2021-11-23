import { FC, ChangeEvent } from "react";
import styles from "./datePicker.module.css";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
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
    <input
      className={styles.input}
      type="date"
      value={dateString}
      onChange={handleChange}
      required
    />
  );
};

export default DatePicker;
