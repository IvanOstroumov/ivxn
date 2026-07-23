import Image from "next/image";
import { useTranslations } from "next-intl";

// Real photo, stylized per ASSETS.md (grayscale + accent-colored ring rather
// than a plain photo, so it reads as "designed" and works across all 4
// themes without needing a different image per theme).
export function AvatarPhoto() {
  const t = useTranslations("hero");
  return (
    <div
      className="relative h-40 w-40 overflow-hidden rounded-full border-2 sm:h-52 sm:w-52"
      style={{ borderColor: "var(--accent)" }}
    >
      <Image
        src="/photo/ivan.jpg"
        alt={t("name")}
        fill
        sizes="208px"
        className="object-cover grayscale"
        priority
      />
    </div>
  );
}
