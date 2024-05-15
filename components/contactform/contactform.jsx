"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./contactform.module.css";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_PUBLIC_KEY,
      )
      .then(
        (result) => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
      );

    // Clears the form after sending the email
    e.target.reset();
  };
  return (
    <form onSubmit={sendEmail} className={styles.formContainer}>
      <h2 className={styles.subtitle}>Contact Us</h2>
      <label className={styles.contactLabel}>Name:</label>
      <input className={styles.contactInput} type="text" name="user_name" />
      <label className={styles.contactLabel}>
        <br></br>Email:
      </label>
      <input className={styles.contactInput} type="email" name="user_email" />
      <label className={styles.contactLabel}>
        <br></br>Message:
      </label>
      <textarea className={styles.contactBox} name="message" />
      <input
        className={styles.contactButton}
        type="submit"
        value="Send"
        disabled={isSubmitting}
      />
      {stateMessage && <p>{stateMessage}</p>}
    </form>
  );
};
export default ContactForm;
