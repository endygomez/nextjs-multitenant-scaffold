"use client";
// components/AnimatedSection.tsx
import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }} // amount determines when the element will be considered visible (30% in view)
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
