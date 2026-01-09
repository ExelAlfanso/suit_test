import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 5], ["0%", "10%"])
  );

  const textY = useSpring(useTransform(scrollYProgress, [0, 5], ["0%", "40%"]));
  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden text-white h-100 "
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 ">
        <Image
          src="/images/banner1.jpg"
          alt="Banner Ideas"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-black/40" />

      <motion.div
        style={{ y: textY }}
        className="relative z-20 flex flex-col items-center justify-center h-full"
      >
        <h1 className="text-4xl font-bold">Ideas</h1>
        <p>Where all our great things begin</p>
      </motion.div>
      <div className="absolute left-0 z-30 w-full origin-bottom-left -skew-y-3 bg-white -bottom-100 h-100" />
    </motion.section>
  );
}
