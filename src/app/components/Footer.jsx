'use client'

import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
      return (
            <>
                  <div className="flex flex-col gap-2 items-center justify-center w-full absolute bottom-0 right-0 border p-3 py-6">
                        <div className="text-xl text-black/50 flex gap-2 items-center">
                              <IoLogoGithub />Developed By <Link href="https://github.com/SeanNachapat" className="underline text-black">SeanNachapat</Link> & <Link href="https://github.com/AZDEV2006" className="underline text-black">AZ</Link>
                        </div>
                  </div>
            </>
      )
}

export default Footer;