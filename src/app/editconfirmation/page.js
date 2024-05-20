import React, { Suspense } from "react";

import styles from "./editconfirmation.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import EditConfirmationForm from "/components/editconfirmationform/editconfirmationform.jsx";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <Suspense fallback={<div>Loading...</div>}>
          <EditConfirmationForm />
        </Suspense>
      </div>
    </div>
  );
}
