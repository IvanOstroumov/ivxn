import type { Tool } from "@/content/types";
import { upsertToolAction } from "@/app/admin/actions";
import { UploadButton } from "./UploadButton";

const inputClass =
  "w-full rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2";

export function ToolForm({ tool }: { tool?: Tool }) {
  return (
    <form action={upsertToolAction} className="flex flex-col gap-4">
      <input type="hidden" name="originalSlug" value={tool?.slug ?? ""} />

      <label className="flex flex-col gap-1 text-sm">
        Name
        <input name="name" defaultValue={tool?.name} required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          defaultValue={tool?.description}
          required
          rows={4}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Version
        <input name="version" defaultValue={tool?.version} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Platforms (comma-separated, e.g. Windows, Android)
        <input
          name="platforms"
          defaultValue={tool?.platforms.join(", ")}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        File size (optional, e.g. 24 MB)
        <input name="fileSize" defaultValue={tool?.fileSize} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Changelog (one line per entry)
        <textarea
          name="changelog"
          defaultValue={tool?.changelog.join("\n")}
          rows={3}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Download file
        <span className="flex items-center gap-2">
          <input
            id="tool-downloadUrl"
            name="downloadUrl"
            defaultValue={tool?.downloadUrl}
            className={inputClass}
            placeholder="https://... (leave empty to show 'Not available yet')"
          />
          <UploadButton targetInputId="tool-downloadUrl" />
        </span>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Source URL
        <input name="sourceUrl" defaultValue={tool?.sourceUrl} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Unavailable note (optional — e.g. why it's not on the Play Store)
        <input
          name="unavailableNote"
          defaultValue={tool?.unavailableNote}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-[var(--radius-theme)] px-4 py-2 font-medium"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
      >
        Save
      </button>
    </form>
  );
}
