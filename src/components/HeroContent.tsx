"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { AvatarPhoto } from "@/components/AvatarPhoto";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Staggered entrance for the hero — every piece arrives in sequence on load
// instead of appearing all at once, the first motion a visitor sees.
export function HeroContent() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <motion.div variants={item}>
        <AvatarPhoto />
      </motion.div>
      <motion.h1 variants={item} className="text-4xl font-semibold">
        {t("name")}
      </motion.h1>
      <motion.p variants={item} className="text-[var(--text-muted)]">
        {t("brand")}
      </motion.p>
      <motion.p variants={item} className="max-w-md text-[var(--text-muted)]">
        {t("tagline")}
      </motion.p>
      <motion.div variants={item}>
        <CTAButton>{tCta("contact")}</CTAButton>
      </motion.div>
    </motion.main>
  );
}
