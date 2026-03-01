export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[14px] focus:border-[3px] focus:border-black focus:bg-white focus:px-4 focus:py-2 focus:font-extrabold focus:shadow-[var(--shadow)]"
    >
      Skip to content
    </a>
  );
}
