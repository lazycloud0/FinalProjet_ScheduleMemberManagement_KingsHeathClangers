import React, { Suspense } from "react";
import styles from "./contactconfirmation.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import ContactConfirmationForm from "/components/contactconfirmationform/contactconfirmationform.jsx";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <Suspense fallback={<div>Loading...</div>}>
          <ContactConfirmationForm />
        </Suspense>
      </div>
    </div>
  );
}
