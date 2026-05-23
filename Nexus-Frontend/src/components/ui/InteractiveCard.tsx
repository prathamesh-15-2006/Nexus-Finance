import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "../../lib/utils"; // Assuming cn is a utility for conditionally joining class names

export const InteractiveCard = ({
  children,
  className,
  InteractiveColor = "rgb(15, 22, 22)",
  borderRadius = "48px",
  rotationFactor = 0.4,
  transitionDuration = 0.3,
  transitionEasing = "easeInOut",
  tailwindBgClass = "bg-transparent backdrop-blur-md",
  textColor = "text-white",
}: {
  children: React.ReactNode;
  className?: string;
  InteractiveColor?: string;
  borderRadius?: string;
  rotationFactor?: number;
  transitionDuration?: number;
  transitionEasing?: string;
  tailwindBgClass?: string;
  textColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXTrans = useTransform(y, [0, 1], [rotationFactor * 15, -rotationFactor * 15]);
  const rotateYTrans = useTransform(x, [0, 1], [-rotationFactor * 15, rotationFactor * 15]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;

    x.set(px);
    y.set(py);
  };

  const xPercentage = useTransform(x, (val) => `${val * 100}%`);
  const yPercentage = useTransform(y, (val) => `${val * 100}%`);

  const interactiveBackground = useMotionTemplate`radial-gradient(circle at ${xPercentage} ${yPercentage}, ${InteractiveColor} 0%, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{
        perspective: 1000,
        borderRadius,
      }}
      className="relative w-full max-w-4xl mx-auto aspect-[17/10] md:aspect-[17/10] isolate border-none"
    >
      <motion.div
        style={{
          rotateX: rotateXTrans,
          rotateY: rotateYTrans,
          transformStyle: "preserve-3d",
          transition: `transform ${transitionDuration}s ${transitionEasing}`,
        }}
        className="w-full h-full rounded-[48px] overflow-hidden shadow-lg border-none"
      >
        {/* Background Interactive Layer */}
        <motion.div
          className="absolute inset-0 rounded-[48px] z-0"
          style={{
            background: interactiveBackground,
            transition: `opacity ${transitionDuration}s ${transitionEasing}`,
            opacity: isHovered ? 0.6 : 0,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 w-full h-full p-4 sm:p-6 md:p-8 text-center border-none outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent",
            tailwindBgClass,
            textColor,
            className,
          )}
          style={{
            borderRadius,
            border: 'none',
            outline: 'none',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
