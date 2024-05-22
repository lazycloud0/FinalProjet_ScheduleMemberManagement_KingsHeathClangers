"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Import useRouter correctly
import styles from "./contactconfirmationform.module.css"; // Import your CSS module

export default function EditConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
  const message = searchParams.get("message");

  const handleReturn = () => {
    router.push("/"); // Redirect to /whatson page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.successMessage}>MESSAGE SENT SUCCESSFULY</h1>
      <p className={styles.thankYouMessage}>
        Thank you for contacting Kings Heath Clangers
      </p>
      <button className={styles.returnButton} onClick={handleReturn}>
        RETURN TO HOME PAGE
      </button>{" "}
      {/* Add button */}
    </div>
  );
}
