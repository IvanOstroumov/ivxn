import { useTranslations } from "next-intl";

// Stand-in for Ivan's photo until it's provided (see ASSETS.md). Uses the
// theme's own accent tokens so it reads as "designed" rather than a broken image.
export function AvatarPlaceholder() {
  const t = useTranslations("hero");
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-40 w-40 items-center justify-center rounded-full border text-4xl font-semibold sm:h-52 sm:w-52"
        style={{
          borderColor: "var(--accent)",
          color: "var(--accent)",
          backgroundColor: "var(--surface)",
        }}
      >
        IO
      </div>
      <span className="text-xs text-[var(--text-muted)]">{t("photoPending")}</span>
    </div>
  );
}
