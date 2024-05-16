import styles from "./groupbuttons.module.css";

export default function GroupButtons() {
  return (
    <div className={styles.groupButtons}>
      <button className={styles.groupButton}>Group 1</button>
      <button className={styles.groupButton}>Group 2</button>
      <button className={styles.groupButton}>Group 3</button>
      <button className={styles.groupButton}>Group 4</button>
    </div>
  );
}
