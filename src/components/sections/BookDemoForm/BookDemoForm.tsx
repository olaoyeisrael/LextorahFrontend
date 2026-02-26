import { useState } from "react";
import styles from "./BookDemoForm.module.css";

interface RadioOption {
  value: string;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: RadioOption[];
}

interface FormSection {
  number: number;
  icon: string;
  title: string;
  description?: string;
  type: string;
  name?: string;
  required?: boolean;
  options?: RadioOption[];
  fields?: Field[];
  label?: string;
}

interface BookDemoFormProps {
  sections: FormSection[];
  submitButton: string;
}

export default function BookDemoForm({
  sections,
  submitButton,
}: BookDemoFormProps) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>({
    institutionName: "",
    institutionType: [],
    country: "",
    fullName: "",
    email: "",
    phone: "",
    demoFocus: [],
    learnerScale: "",
    demoFormat: "",
    consent: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, value: string) => {
    const currentValues = (formData[name] as string[]) || [];
    if (currentValues.includes(value)) {
      setFormData({
        ...formData,
        [name]: currentValues.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: [...currentValues, value],
      });
    }
  };

  const handleConsentChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked ? "agreed" : "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo form submitted:", formData);
    alert(
      "Thank you for your demo request! Our team will contact you shortly to schedule your demo."
    );
  };

  const renderSection = (section: FormSection) => {
    switch (section.type) {
      case "radio":
        return (
          <div className={styles.radioGroup}>
            {section.options?.map((option) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={section.name}
                  value={option.value}
                  checked={formData[section.name!] === option.value}
                  onChange={(e) =>
                    handleInputChange(section.name!, e.target.value)
                  }
                  className={styles.radioInput}
                  required={section.required}
                />
                <span className={styles.radioCustom}></span>
                <span className={styles.radioText}>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className={styles.checkboxGroup}>
            {section.options?.map((option) => (
              <label key={option.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name={section.name}
                  value={option.value}
                  checked={(formData[section.name!] as string[])?.includes(
                    option.value
                  )}
                  onChange={() =>
                    handleCheckboxChange(section.name!, option.value)
                  }
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case "consent":
        return (
          <div className={styles.consentGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name={section.name}
                checked={formData[section.name!] === "agreed"}
                onChange={(e) =>
                  handleConsentChange(section.name!, e.target.checked)
                }
                className={styles.checkboxInput}
                required={section.required}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.checkboxText}>{section.label}</span>
            </label>
          </div>
        );

      case "fields":
        return (
          <div className={styles.fieldsGroup}>
            {section.fields?.map((field) => (
              <div key={field.name} className={styles.field}>
                <label htmlFor={field.name} className={styles.fieldLabel}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] as string}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={styles.input}
                />
              </div>
            ))}
          </div>
        );

      case "mixed":
        return (
          <div className={styles.mixedGroup}>
            {section.fields?.map((field) => (
              <div key={field.name} className={styles.mixedField}>
                <label htmlFor={field.name} className={styles.fieldLabel}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>
                {(field.type === "text" || field.type === "email" || field.type === "tel") && (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] as string}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    className={styles.input}
                  />
                )}
                {field.type === "checkbox-grid" && (
                  <div className={styles.checkboxGrid}>
                    {field.options?.map((option) => (
                      <label
                        key={option.value}
                        className={styles.gridCheckboxLabel}
                      >
                        <input
                          type="checkbox"
                          name={field.name}
                          value={option.value}
                          checked={(formData[field.name] as string[])?.includes(
                            option.value
                          )}
                          onChange={() =>
                            handleCheckboxChange(field.name, option.value)
                          }
                          className={styles.checkboxInput}
                        />
                        <span className={styles.checkboxCustom}></span>
                        <span className={styles.checkboxText}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {sections.map((section) => (
            <div key={section.number} className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  <img
                    src={section.icon}
                    alt={`${section.title} Icon`}
                    width={32}
                    height={32}
                  />
                </span>
                <h2 className={styles.sectionTitle}>
                  {section.number}. {section.title}
                </h2>
              </div>

              {section.description && (
                <p className={styles.sectionDescription}>
                  {section.description}
                  {section.required && section.type === "radio" && (
                    <span className={styles.required}>*</span>
                  )}
                </p>
              )}

              {renderSection(section)}
            </div>
          ))}

          <button type="submit" className={styles.submitButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            {submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}
