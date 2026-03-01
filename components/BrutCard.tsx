export default function BrutCard({
  children,
  variant = "default"
}: {
  children: React.ReactNode;
  variant?: "default" | "featured" | "note" | "media";
}) {
  const base =
    "rounded-[var(--radius)] border-[3px] border-black bg-white p-5 shadow-[var(--shadow)]";
  const variants: Record<string, string> = {
    default: "",
    featured: "bg-[var(--muted)]",
    note: "bg-[var(--muted)]",
    media: "bg-white"
  };

  return <div className={`${base} ${variants[variant] ?? ""}`}>{children}</div>;
}
