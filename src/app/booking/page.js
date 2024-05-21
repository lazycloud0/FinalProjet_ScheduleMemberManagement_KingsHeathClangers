import React, { Suspense } from "react";
import styles from "./booking.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import Booking from "/components/bookingform/bookingform.jsx";

export default function Schedule() {
  return (
    <div className={styles.schedulePage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <Suspense fallback={<div>Loading...</div>}>
          <Booking className={styles.mainBooking} />
        </Suspense>
      </div>
    </div>
  );
}
