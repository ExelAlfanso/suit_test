"use client";

import Image from "next/image";
import headerData from "../datas/HeaderDatas";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useTransform } from "motion/react";

export default function Header({
  reference,
}: {
  reference: React.RefObject<HTMLDivElement | null>;
}) {
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(
    pathName.charAt(1).toUpperCase() + pathName.slice(2) || "Home"
  );

  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["start start", "end start"],
  });
  const headerOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [1, 0])
  );
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("scrollYProgress:", latest);
  // });

  return (
    <motion.header
      initial={{ opacity: 1 }}
      style={{
        opacity: headerOpacity,
      }}
      className="p-4 bg-primary flex items-center justify-between text-white px-20 fixed w-full top-0 z-50"
    >
      <Image
        src="suitmedia.svg"
        alt="Suitmedia Logo"
        width={100}
        height={50}
      ></Image>
      <span className="flex gap-6">
        {headerData.navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className={` relative`}
            onClick={() => setCurrentPage(link.name)}
          >
            {link.name}
            {
              <span
                className={`absolute left-0 -bottom-2 w-full h-full border-b-3 border-white transform transition-transform duration-100 ${
                  currentPage === link.name ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            }
          </Link>
        ))}
      </span>
    </motion.header>
  );
}
