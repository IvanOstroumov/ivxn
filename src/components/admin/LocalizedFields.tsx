import type { LocalizedText } from "@/content/types";

const LOCALES: { code: keyof LocalizedText; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "it", label: "Italiano" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
];

const fieldClass =
  "w-full rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2";

/**
 * Renders one input/textarea per site locale for a single logical field
 * (e.g. `shortDescription` becomes `shortDescription_en`, `shortDescription_ru`, ...).
 * `upsertProjectAction`/`upsertToolAction` read those `${name}_${locale}` keys
 * back out of the FormData to reassemble a LocalizedText object.
 */
export function LocalizedFields({
  name,
  label,
  value,
  required,
  multiline,
}: {
  name: string;
  label: string;
  value?: LocalizedText;
  required?: boolean;
  multiline?: boolean;
}) {
  return (
    <fieldset className="flex flex-col gap-2 rounded-[var(--radius-theme)] border border-[var(--border)] p-3">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      {LOCALES.map(({ code, label: localeLabel }) => (
        <label key={code} className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          {localeLabel}
          {multiline ? (
            <textarea
              name={`${name}_${code}`}
              defaultValue={value?.[code]}
              required={required && code === "en"}
              rows={3}
              className={fieldClass}
            />
          ) : (
            <input
              name={`${name}_${code}`}
              defaultValue={value?.[code]}
              required={required && code === "en"}
              className={fieldClass}
            />
          )}
        </label>
      ))}
    </fieldset>
  );
}
