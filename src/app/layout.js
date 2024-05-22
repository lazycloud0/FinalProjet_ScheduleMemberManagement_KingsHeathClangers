import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "King's Heath Clangers",
  description:
    "King's Heath Clangers is the third league basketball champion based in Birmingham, UK.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${styles.container} ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
