import styles from "./schedule.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import Form from "/components/scheduleform/scheduleform.jsx";

export default function Schedule() {
  return (
    <div className={styles.container}>
      <LargeLogo className={styles.largeLogo} />
      <Form className={styles.scheduleForm} />
    </div>
  );
}
