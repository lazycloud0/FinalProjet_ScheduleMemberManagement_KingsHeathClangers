import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LargeLogo from "../../../components/logos/largeLogo";
import styles from "./protected.module.css";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className={styles.main}>
      <div>
        <LargeLogo className={styles.largeLogo} />
        <h1 className={styles.h1}>Hello {data.user.email}</h1>
      </div>
    </main>
  );
}
