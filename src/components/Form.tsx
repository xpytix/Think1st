import Field from "./Field";
import ImageUploader from "./ImageUploader";
import RangeSlider from "./RangeSlider";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import Title from "./Title";
import DatepickerComponent from "./Datepicker/Datepicker";
import { submitForm } from "../services/api";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 8,
    photo: null as File | null,
    date: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      age: value,
    }));
  };

  const handleImageUpload = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleDateChange = (newDate: string) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  // Funkcja walidująca e-mail
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return `Please use correct formatting.
      Example: address@email.com`;
    }
    return "";
  };

  const isValid = (): boolean => {
    return validateEmail(formData.email) === "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setErrors({ email: "" }); 
    setIsSubmitting(true);

    try {
      const result = await submitForm(formData);
      console.log("Form successfully submitted:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className="my-12 px-8 flex flex-col justify-center max-w-sm"
      onSubmit={handleSubmit}
    >
      <Title text="Personal Info" level={2} />
      <Field
        id="first-name"
        label="First Name"
        onChange={(value) => handleInputChange("firstName", value)}
      />
      <Field
        id="last-name"
        label="Last Name"
        onChange={(value) => handleInputChange("lastName", value)}
      />
      <Field
        id="email"
        label="Email Address"
        type="email"
        required={true}
        autoComplete="email"
        onChange={(value) => {
          handleInputChange("email", value);
        }}
        validate={validateEmail}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <RangeSlider
        label="Age"
        value={formData.age}
        min={8}
        max={100}
        step={1}
        onChange={handleRangeChange}
      />
      <ImageUploader label="Photo" onUpload={handleImageUpload} />
      <Title text="Your workout" level={2} />
      <DatepickerComponent
        id="datepicker-inline"
        labelDate="Date"
        labelTime="Time"
        onChange={() => handleDateChange}
      />

      <SubmitButton
        label={isSubmitting ? "Submitting..." : "Send Application"}
        onClick={() => handleSubmit}
        disabled={!isValid()}
      />
    </form>
  );
};

export default Form;
