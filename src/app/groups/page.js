import React from "react";
import styles from "./groups.module.css";
import LargeLogo from "../../../components/logos/largeLogo";
import GroupButtons from "/components/groupbuttons/groupbuttons.jsx";

export default function Groups() {
  return (
    <div className={styles.groupsPage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <GroupButtons />
      </div>
    </div>
  );
}
