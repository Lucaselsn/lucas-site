import Link from "next/link";

export default function AboutPage() {
  const SHOW_SHOP = false;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white/70 hover:text-white">
              Work
            </Link>
            <Link href="/about" className="text-white">
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
            <Link href="/contact" className="text-white/70 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16 pt-[140px]">
        <p className="text-xs uppercase tracking-[0.3em] text-white/55">
          About
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
          Music videos, visual storytelling, and building a path through image.
        </h1>

        <div className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-white/78 md:text-lg">
          <p>
            I’m a director based in Atlanta, focused on music videos and visual
            storytelling.
          </p>
          <p>
            I started creating early, building my own path through video
            editing, directing, and creative work before stepping into full
            productions. Over time, that grew into working with artists across
            different scenes and developing a consistent approach to visuals,
            one that prioritizes atmosphere, pacing, and identity.
          </p>
          <p>
            My work has reached thousands of viewers across platforms, with
            videos continuing to circulate and gain traction online. More
            importantly, the focus has always been on creating pieces that
            actually connect, projects that feel intentional and aligned with
            the artist rather than disposable content.
          </p>
          <p>
            Beyond directing, I’m involved in the full creative process, from
            concept development to execution, making sure each project has a
            clear vision from start to finish.
          </p>
          <p>
            This is an ongoing process. Every project builds on the last.
          </p>
        </div>
      </main>
    </div>
  );
}