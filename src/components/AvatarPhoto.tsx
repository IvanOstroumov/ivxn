import Image from "next/image";
import { useTranslations } from "next-intl";

// Real photo, full color per Ivan's request — just a themed accent ring so it
// still reads as "designed" and ties into whichever theme is active.
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
        className="object-cover"
        priority
      />
    </div>
  );
}
