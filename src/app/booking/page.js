import styles from "./booking.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import BookingForm from "/components/bookingform/bookingform.jsx";

export default function Booking() {
  return (
    <div className={styles.bookingPage}>
      <div className={styles.bookingContainer}>
        <LargeLogo className={styles.largeLogo} />
        <BookingForm />
      </div>
    </div>
  );
}
