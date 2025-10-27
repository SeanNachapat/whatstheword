import { Kanit } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["200", "300"]
})

export const metadata = {
  title: "What's The Word?",
  description: "What's The Word?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.className}`}>
        {children}
      </body>
    </html>
  );
}
