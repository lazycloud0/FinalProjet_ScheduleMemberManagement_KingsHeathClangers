import styles from "./groupbuttons.module.css";

export default function GroupButtons() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.groupButton}>Men</button>
      <button className={styles.groupButton}>Women</button>
      <button className={styles.groupButton}>Under 18s</button>
      <button className={styles.groupButton}>Under 15s</button>
      <button className={styles.groupButton}>Open to all</button>
    </div>
  );
}
