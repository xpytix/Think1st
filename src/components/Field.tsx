import React, { useState } from "react";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (value: string) => void; // Callback do przekazywania zmienionego stanu
  validate?: (value: string) => string | null; // Funkcja walidująca, zwraca komunikat o błędzie lub null
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  required,
  autoComplete,
  onChange,
  validate,
}) => {
  const [value, setValue] = useState<string>(""); // Przechowuje wartość pola
  const [error, setError] = useState<string | null>(null); // Przechowuje komunikat o błędzie

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Jeśli przekazano funkcję walidującą, sprawdź dane
    if (validate) {
      const validationError = validate(newValue);
      setError(validationError);
    }

    // Wywołaj callback onChange, jeśli został przekazany
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="my-2">
      <label htmlFor={id} className="block text-base font-normal text-text">
        {label}
      </label>
      <div className="">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          className={`block w-full bg-white focus:bg-bgFocus px-3 py-2.5 text-base text-gray-900 border-solid ${
            error
              ? "border-error  bg-errorContrast focus:border-red-500"
              : "border-secondary focus:border-primary focus:border-2"
          } focus:outline-none border rounded-lg`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1 max-w-[300]">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Field;
