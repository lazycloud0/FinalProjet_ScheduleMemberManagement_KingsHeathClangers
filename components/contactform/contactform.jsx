"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./contactform.module.css";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    userEmail: "",
    message: "",
  });

  const router = useRouter();

  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();

    let errors = { userName: "", userEmail: "", message: "" };

    if (userName === "") {
      errors.userName = "Name is required";
    }

    if (userEmail === "") {
      errors.userEmail = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(userEmail)
    ) {
      errors.userEmail = "Invalid email";
    }

    if (message === "") {
      errors.message = "Message is required";
    }

    if (errors.userName || errors.userEmail || errors.message) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_REACT_APP_SERVICE_ID,
        process.env.NEXT_PUBLIC_REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_REACT_APP_PUBLIC_KEY,
      )
      .then(
        (result) => {
          setStateMessage("");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
            router.push("/contactconfirmation"); // navigate to the confirmation page
          }, 1); // hide message after 5 seconds
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
      <input
        className={styles.contactInput}
        type="text"
        name="user_name"
        placeholder="Name"
        aria-label="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {errors.userName && <p className={styles.error}>{errors.userName}</p>}
      <input
        className={styles.contactInput}
        type="email"
        name="user_email"
        placeholder="Email"
        aria-label="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      {errors.userEmail && <p className={styles.error}>{errors.userEmail}</p>}
      <textarea
        className={styles.contactBox}
        name="message"
        placeholder="Message"
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {errors.message && <p className={styles.error}>{errors.message}</p>}
      <input
        className={styles.contactButton}
        type="submit"
        value="SEND"
        disabled={isSubmitting}
      />
      {stateMessage && <p>{stateMessage}</p>}
    </form>
  );
};
export default ContactForm;
