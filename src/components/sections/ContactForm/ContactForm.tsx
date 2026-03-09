import { useState } from "react";
import styles from "./ContactForm.module.css";

interface FormFields {
  fullName: { label: string; placeholder: string; required: boolean };
  email: { label: string; placeholder: string; required: boolean };
  phone: { label: string; placeholder: string; required: boolean };
  areaOfInterest: {
    label: string;
    placeholder: string;
    required: boolean;
    options: string[];
  };
  message: {
    label: string;
    placeholder: string;
    required: boolean;
    maxLength: number;
  };
}

interface ContactFormProps {
  title: string;
  subtitle: string;
  fields: FormFields;
  submitButton: string;
}

export default function ContactForm({
  title,
  subtitle,
  fields,
  submitButton,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message") {
      if (value.length <= fields.message.maxLength) {
        setFormData({ ...formData, [name]: value });
        setCharCount(value.length);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        setSubmitStatus('success');
        setSubmitMessage(json.msg || 'Your message has been sent!');
        setFormData({ fullName: '', email: '', phone: '', areaOfInterest: '', message: '' });
        setCharCount(0);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(json.detail || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="fullName" className={styles.label}>
                {fields.fullName.label}{" "}
                {fields.fullName.required && <span className={styles.required}>*</span>}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder={fields.fullName.placeholder}
                value={formData.fullName}
                onChange={handleChange}
                required={fields.fullName.required}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                {fields.email.label}{" "}
                {fields.email.required && <span className={styles.required}>*</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={fields.email.placeholder}
                value={formData.email}
                onChange={handleChange}
                required={fields.email.required}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                {fields.phone.label}{" "}
                {fields.phone.required && <span className={styles.required}>*</span>}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder={fields.phone.placeholder}
                value={formData.phone}
                onChange={handleChange}
                required={fields.phone.required}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="areaOfInterest" className={styles.label}>
                {fields.areaOfInterest.label}{" "}
                {fields.areaOfInterest.required && (
                  <span className={styles.required}>*</span>
                )}
              </label>
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                required={fields.areaOfInterest.required}
                className={styles.select}
              >
                <option value="">{fields.areaOfInterest.placeholder}</option>
                {fields.areaOfInterest.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              {fields.message.label}{" "}
              {fields.message.required && <span className={styles.required}>*</span>}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={fields.message.placeholder}
              value={formData.message}
              onChange={handleChange}
              required={fields.message.required}
              className={styles.textarea}
              rows={5}
            />
            <div className={styles.charCount}>
              {charCount}/{fields.message.maxLength} characters
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Sending...' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                {submitButton}
              </>
            )}
          </button>

          {submitStatus && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 500,
              textAlign: 'center',
              backgroundColor: submitStatus === 'success' ? '#f0fdf4' : '#fef2f2',
              color: submitStatus === 'success' ? '#15803d' : '#b91c1c',
              border: `1px solid ${submitStatus === 'success' ? '#bbf7d0' : '#fecaca'}`,
            }}>
              {submitMessage}
            </div>
          )}
        </form>

      </div>
    </section>
  );
}
