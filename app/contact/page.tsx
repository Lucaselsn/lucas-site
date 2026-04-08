import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ContactPage() {
  const SHOW_SHOP = false;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white/70 hover:text-white">
              Work
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white">
              About
            </Link>
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
           <div className="flex h-16 w-[140px] items-center justify-center overflow-hidden sm:w-[220px] md:h-32 md:w-[520px]">
  {/* Static image on mobile, video on desktop */}
  <img
    src="/logo.png"
    alt="Logo"
    className="max-h-full max-w-full object-contain md:hidden"
  />
  <video
    autoPlay
    muted
    playsInline
    loop
    className="hidden max-h-full max-w-full object-contain md:block"
  >
    <source src="/logo-transparent.webm" type="video/webm" />
  </video>
</div>
          </Link>

          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            {SHOW_SHOP && (
              <Link href="/shop" className="text-white/70 hover:text-white">
                Shop
              </Link>
            )}
            <Link href="/contact" className="text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-[140px]">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">
              Contact
            </p>
            <h1 className="mt-3 text-4xl tracking-[-0.05em] md:text-7xl">
              Inquiries.
            </h1>
          </div>

          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.22em] text-white/60">
            <a
              href="https://instagram.com/lucaselsn"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@Lucaselsn"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              YouTube
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <p className="max-w-md text-sm leading-7 text-white/68 md:text-base">
              Use this page for music videos, creative direction, branded
              visuals, and artist development inquiries.
            </p>
            <div className="space-y-3 text-sm uppercase tracking-[0.2em] text-white/58">
              <p>Based in Atlanta / Los Angeles</p>
              <p>Email: zrovfx@gmail.com</p>
              <p>Instagram: @lucaselsn</p>
              <p>YouTube: @Lucaselsn</p>
            </div>
          </div>

          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Company or Artist Name"
              className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />
            <input
              type="text"
              placeholder="Instagram Link"
              className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Based Out Of"
                className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
              />
            </div>
            <input
              type="text"
              placeholder="Subject for Inquiry"
              className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />
            <input
              type="text"
              placeholder="Website Link"
              className="border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />
            <textarea
              placeholder="Message"
              rows={6}
              className="resize-none border-b border-white/15 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-white/40"
            />

            <button
              type="submit"
              className="mt-4 inline-flex w-fit items-center rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black"
            >
              Submit
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}