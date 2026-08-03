export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.question} className="card p-4">
            <p className="font-medium">{item.question}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
