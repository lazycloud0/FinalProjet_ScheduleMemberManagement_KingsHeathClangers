import styles from "./groupbuttons.module.css";

export default function GroupButtons() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.groupButton}>Open sessions</button>
      <button className={styles.groupButton}>Men</button>
      <button className={styles.groupButton}>Women</button>
      <button className={styles.groupButton}>Youth: 15-18</button>
      <button className={styles.groupButton}>Youth: Under 14s</button>
    </div>
  );
}
