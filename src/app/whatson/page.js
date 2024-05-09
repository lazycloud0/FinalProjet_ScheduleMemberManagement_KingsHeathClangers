import Calendar from '/components/calendar/calendar.jsx'
import styles from "./whatson.module.css"

export default function Whatson() {
  return (
    <div className={styles.whatson}>
      <Calendar />
    </div>
  );
}