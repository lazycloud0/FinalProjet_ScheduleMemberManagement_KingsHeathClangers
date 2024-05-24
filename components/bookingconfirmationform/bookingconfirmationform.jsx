"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./bookingconfirmationform.module.css";

export default function BookingConfirmationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get("message");

  const handleReturn = () => {
    router.push("/whatson");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.successMessage}>BOOKING SUCCESSFUL</h1>

      <button className={styles.returnButton} onClick={handleReturn}>
        RETURN TO THE CALENDAR
      </button>
    </div>
  );
}
