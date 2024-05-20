import styles from "./edit.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import EditForm from "/components/editform/editform.jsx";

export default function Edit() {
  return (
    <div className={styles.schedulePage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <EditForm />
      </div>
    </div>
  );
}
