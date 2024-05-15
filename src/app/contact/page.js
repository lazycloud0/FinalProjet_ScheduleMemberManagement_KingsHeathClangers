import React from "react";

import styles from "./contact.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import ContactForm from "/components/contactform/contactform.jsx";

export default function Schedule() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <ContactForm />
      </div>
    </div>
  );
}
