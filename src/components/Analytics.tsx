// Privacy-friendly, cookie-less analytics (Plausible) — see PROJECT_SPEC.md §2.
// Only renders once a domain is actually configured, so it's a no-op until
// Ivan sets up a Plausible/Umami account and adds the env var.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
