import React, { Suspense } from "react";
import styles from "./bookingconfirmation.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import BookingConfirmationForm from "/components/bookingconfirmationform/bookingconfirmationform.jsx";

export default function BookingConfirmation() {
  return (
    <div className={styles.container}>
      <LargeLogo className={styles.largeLogo} />
      <Suspense
        className={styles.confirmation}
        fallback={<div>Loading...</div>}
      >
        <BookingConfirmationForm />
      </Suspense>
    </div>
  );
}
