"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Import useRouter correctly
import styles from "./editconfirmationform.module.css"; // Import your CSS module

export default function EditConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
  const message = searchParams.get("message");

  const handleReturn = () => {
    router.push("/whatson"); // Redirect to /whatson page
  };

  return (
    <div className={styles.container}>
      {message === "updated" && (
        <h1 className={styles.successMessage}>EVENT SUCCESSFULLY UPDATED</h1>
      )}
      {message === "deleted" && (
        <h1 className={styles.successMessage}>
          THE EVENT HAS BEEN DELETED SUCCESSFULLY
        </h1>
      )}
      <button className={styles.returnButton} onClick={handleReturn}>
        RETURN TO THE CALENDAR
      </button>{" "}
      {/* Add button */}
    </div>
  );
}
