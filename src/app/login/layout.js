import { Kanit } from "next/font/google";
import "../globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["200", "300"]
})  

export default function Login({ children }) {
  return (
    <div className={`${kanit.className}`}>
      {children}
    </div>
  );
}
